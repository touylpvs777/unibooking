import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CarRentalDetails,
  HotelDetails,
  Image,
  InventoryPricing,
  Prisma,
  Role,
  Service,
  TourDetails,
  TransportDetails,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { AddInventoryDto } from './dto/add-inventory.dto';
import { AddImagesDto } from './dto/add-images.dto';
import {
  SearchServicesQueryDto,
  ServiceSortBy,
} from './dto/search-services-query.dto';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// What a search result exposes about its supplier -- deliberately not the
// full Supplier row (no contactEmail/taxId) since this feeds a public endpoint.
// `images` is capped to 1 (the oldest, i.e. the cover photo) -- a list of
// cards only ever shows one image each, so there's no reason to ship the
// full gallery for every row on a search page.
const searchResultInclude = {
  supplier: { select: { companyName: true, isVerified: true } },
  images: { orderBy: { createdAt: 'asc' }, take: 1 },
} satisfies Prisma.ServiceInclude;

// The full gallery, oldest (cover) first -- used by the supplier portal
// (managing every photo) and the Service Details page (showing all of them).
const allImagesInclude = {
  images: { orderBy: { createdAt: 'asc' } },
} satisfies Prisma.ServiceInclude;

// Powers GET /services/me -- every detail relation is optional since
// exactly one is populated depending on `type` (see the Service model's
// own comment in schema.prisma), and `inventory` is at most the single
// nearest upcoming InventoryPricing row (see findMyServices).
export type ServiceWithDetails = Service & {
  hotelDetails: HotelDetails | null;
  tourDetails: TourDetails | null;
  carRentalDetails: CarRentalDetails | null;
  transportDetails: TransportDetails | null;
  inventory: InventoryPricing[];
  images: Image[];
};

// Powers GET /services/:id -- the public Service Details page. Same
// supplier exposure as searchResultInclude (no contactEmail/taxId), plus
// every vertical detail relation (see ServiceWithDetails above for why
// each is optional) so the page can show type-specific fields (star
// rating, group size, vehicle type, ...) without a second request.
// `inventory` is only populated when a date range is requested (see
// findOne) -- otherwise there's nothing meaningful to show a price for.
export type ServiceDetail = Service & {
  supplier: { companyName: string; isVerified: boolean };
  hotelDetails: HotelDetails | null;
  tourDetails: TourDetails | null;
  carRentalDetails: CarRentalDetails | null;
  transportDetails: TransportDetails | null;
  // Only present at all (as a key) when a date range was requested --
  // `include.inventory` is passed as `false` otherwise, which Prisma
  // treats as "omit the key entirely," not "included as []".
  inventory?: InventoryPricing[];
  images: Image[];
};

export interface SearchResult {
  data: Array<
    Service & {
      supplier: { companyName: string; isVerified: boolean };
      inventory?: InventoryPricing[];
      images: Image[];
    }
  >;
  meta: { page: number; limit: number; total: number; totalPages: number };
}

function emptyPage(page: number, limit: number): SearchResult {
  return { data: [], meta: { page, limit, total: 0, totalPages: 0 } };
}

interface QualifyingService {
  serviceId: string;
  avgPrice: number;
}

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * A SUPPLIER always lists under their own profile, resolved from the JWT
   * -- dto.supplierId is only honoured for ADMIN (onboarding a listing on a
   * supplier's behalf). This is what stops one supplier account from
   * creating a Service under another supplier's id.
   */
  async create(dto: CreateServiceDto, user: JwtPayload): Promise<Service> {
    const supplierId = await this.resolveSupplierId(user, dto.supplierId);

    return this.prisma.service.create({
      data: {
        supplierId,
        type: dto.type,
        name: dto.name,
        description: dto.description,
        location: dto.location,
      },
    });
  }

  /**
   * Powers the supplier portal's inventory table (GET /services/me) --
   * every Service this supplier owns, plus its vertical-specific details
   * and the single nearest upcoming InventoryPricing row (if any) as a
   * lightweight stand-in for "current price / units available" on a list
   * view rather than pulling every date. A freshly created Service has no
   * InventoryPricing rows at all until pricing is added via
   * POST /services/:id/inventory, so `inventory` is often empty here.
   */
  async findMyServices(
    user: JwtPayload,
    requestedSupplierId?: string,
  ): Promise<ServiceWithDetails[]> {
    const supplierId = await this.resolveSupplierId(user, requestedSupplierId);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    return this.prisma.service.findMany({
      where: { supplierId },
      include: {
        hotelDetails: true,
        tourDetails: true,
        carRentalDetails: true,
        transportDetails: true,
        inventory: {
          where: { date: { gte: startOfToday } },
          orderBy: { date: 'asc' },
          take: 1,
        },
        ...allImagesInclude,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Soft-delete: flips isActive to false rather than a real Prisma delete.
   * Service cascades onto InventoryPricing -> BookingItem, so a hard
   * delete here would silently destroy a customer's real booking history
   * the moment a supplier removes a listing -- isActive is already what
   * search() filters on, so deactivating is enough to pull a listing out
   * of the public catalog.
   */
  async deactivate(serviceId: string, user: JwtPayload): Promise<Service> {
    await this.assertOwnsService(serviceId, user);

    return this.prisma.service.update({
      where: { id: serviceId },
      data: { isActive: false },
    });
  }

  /**
   * Bulk-upserts price/availability per date, one row per (service, date).
   * Runs as a single transaction so a batch of 30 dates either lands
   * entirely or not at all -- never half-applied.
   */
  async addInventory(
    serviceId: string,
    dto: AddInventoryDto,
    user: JwtPayload,
  ): Promise<InventoryPricing[]> {
    await this.assertOwnsService(serviceId, user);

    return this.prisma.$transaction(
      dto.entries.map((entry) =>
        this.prisma.inventoryPricing.upsert({
          where: {
            serviceId_date: { serviceId, date: new Date(entry.date) },
          },
          create: {
            serviceId,
            date: new Date(entry.date),
            availableUnits: entry.availableUnits,
            price: entry.price,
          },
          update: {
            availableUnits: entry.availableUnits,
            price: entry.price,
          },
        }),
      ),
    );
  }

  /**
   * Attaches already-uploaded image URLs (see AddImagesDto) to a service --
   * the client is expected to have gotten these from POST /uploads/multiple
   * first. Runs as a transaction for the same reason addInventory() does:
   * a batch of URLs either lands entirely or not at all.
   */
  async addImages(
    serviceId: string,
    dto: AddImagesDto,
    user: JwtPayload,
  ): Promise<Image[]> {
    await this.assertOwnsService(serviceId, user);

    return this.prisma.$transaction(
      dto.urls.map((url) =>
        this.prisma.image.create({ data: { serviceId, url } }),
      ),
    );
  }

  /**
   * `deleteMany` with both `id` and `serviceId` in the where-clause, not a
   * plain `delete({ where: { id } })` -- this is what stops a supplier from
   * deleting an image that exists but belongs to a *different* service (an
   * IDOR: assertOwnsService above only proves they own `serviceId`, not
   * that `imageId` is actually one of its images).
   */
  async removeImage(
    serviceId: string,
    imageId: string,
    user: JwtPayload,
  ): Promise<void> {
    await this.assertOwnsService(serviceId, user);

    const { count } = await this.prisma.image.deleteMany({
      where: { id: imageId, serviceId },
    });
    if (count === 0) {
      throw new NotFoundException(
        `Image with id "${imageId}" not found on this service.`,
      );
    }
  }

  /**
   * The overbooking-safe search: when a date range is given, a service only
   * qualifies if EVERY night in the range has a matching inventory row with
   * availableUnits > 0 -- not merely at least one. Implemented as a groupBy
   * count-per-service against the exact filter, compared to the number of
   * nights requested, rather than a relation `some: {...}` filter (which
   * would wrongly admit a service that's only available for part of the stay).
   *
   * Price isn't a column on Service -- it's set per night on
   * InventoryPricing -- so minPrice/maxPrice and price-based sorting only
   * mean something alongside a date range, and are rejected otherwise
   * rather than silently ignored or computed against something misleading.
   */
  async search(query: SearchServicesQueryDto): Promise<SearchResult> {
    const {
      location,
      types,
      startDate,
      endDate,
      minPrice,
      maxPrice,
      minRating,
      sortBy,
      page,
      limit,
    } = query;

    if (Boolean(startDate) !== Boolean(endDate)) {
      throw new BadRequestException(
        'startDate and endDate must be provided together.',
      );
    }
    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice > maxPrice
    ) {
      throw new BadRequestException(
        'minPrice must not be greater than maxPrice.',
      );
    }

    const sortingByPrice =
      sortBy === ServiceSortBy.PRICE_ASC || sortBy === ServiceSortBy.PRICE_DESC;
    const needsDateRange =
      minPrice !== undefined || maxPrice !== undefined || sortingByPrice;
    if (needsDateRange && !(startDate && endDate)) {
      throw new BadRequestException(
        'minPrice, maxPrice, and price-based sorting all require startDate ' +
          'and endDate -- price is set per night, not per service.',
      );
    }

    const where: Prisma.ServiceWhereInput = {
      isActive: true,
      ...(types && types.length > 0 && { type: { in: types } }),
      ...(location && {
        location: { contains: location, mode: 'insensitive' },
      }),
    };

    // Rating lives on Review, not Service, so "which services qualify" is
    // resolved via a separate aggregate query and folded in as an `id: {in}`
    // constraint -- null means "no rating filter requested" (skip
    // entirely), as opposed to an empty array (filter requested, nothing
    // qualifies).
    const ratingServiceIds = await this.getRatingQualifyingServiceIds(minRating);
    if (ratingServiceIds !== null) {
      if (ratingServiceIds.length === 0) return emptyPage(page, limit);
      where.id = { in: ratingServiceIds };
    }

    if (!startDate || !endDate) {
      return this.searchCatalog(where, page, limit);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      throw new BadRequestException('endDate must be after startDate.');
    }
    const requestedNights = Math.round(
      (end.getTime() - start.getTime()) / MS_PER_DAY,
    );

    // One groupBy answers both "is every night available" (the guarantee
    // above) and "what does this stay cost on average" -- Phase 07's price
    // filtering/sorting piggybacks on the same query rather than adding a
    // second round-trip.
    const availability = await this.prisma.inventoryPricing.groupBy({
      by: ['serviceId'],
      where: { date: { gte: start, lt: end }, availableUnits: { gt: 0 } },
      _count: { _all: true },
      _avg: { price: true },
    });

    // ratingServiceIds was already folded into `where.id` above, but that
    // gets fully replaced by `scopedWhere`'s own `id: {in: qualifying}`
    // below -- re-intersecting here (rather than relying on `where`) is
    // what keeps both constraints in effect together.
    const ratingServiceIdSet = ratingServiceIds && new Set(ratingServiceIds);

    const qualifying: QualifyingService[] = availability
      .filter((row) => row._count._all === requestedNights)
      .map((row) => ({
        serviceId: row.serviceId,
        avgPrice: Number(row._avg.price ?? 0),
      }))
      .filter((row) => minPrice === undefined || row.avgPrice >= minPrice)
      .filter((row) => maxPrice === undefined || row.avgPrice <= maxPrice)
      .filter((row) => !ratingServiceIdSet || ratingServiceIdSet.has(row.serviceId));

    // Nothing has stock across the whole range (or nothing survives the
    // price filter) -- short-circuit rather than hand Prisma an
    // `id: { in: [] }` filter for a guaranteed-empty scan.
    if (qualifying.length === 0) {
      return emptyPage(page, limit);
    }

    const inventoryInclude = {
      inventory: {
        where: { date: { gte: start, lt: end } },
        orderBy: { date: 'asc' },
      },
    } satisfies Prisma.ServiceInclude;

    if (sortingByPrice) {
      return this.searchSortedByPrice(
        qualifying,
        sortBy === ServiceSortBy.PRICE_ASC,
        where,
        inventoryInclude,
        page,
        limit,
      );
    }

    const scopedWhere: Prisma.ServiceWhereInput = {
      ...where,
      id: { in: qualifying.map((row) => row.serviceId) },
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.service.findMany({
        where: scopedWhere,
        include: { ...searchResultInclude, ...inventoryInclude },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.service.count({ where: scopedWhere }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * `null` = no rating filter was requested (caller skips this constraint
   * entirely); an array (possibly empty) = the actual set of qualifying
   * service ids. Raw SQL, not `prisma.review.groupBy`, because Review has
   * no `serviceId` column to group by directly -- it only reaches Service
   * through bookingItem -> inventoryPricing -> service (see the Review
   * model in schema.prisma), and Prisma's groupBy can't aggregate across a
   * relation like that. `$queryRaw`'s tagged-template form parameterizes
   * `minRating` automatically, so this is not raw-SQL-injectable.
   */
  private async getRatingQualifyingServiceIds(
    minRating: number | undefined,
  ): Promise<string[] | null> {
    if (minRating === undefined) return null;

    const rows = await this.prisma.$queryRaw<{ serviceId: string }[]>`
      SELECT ip."serviceId" AS "serviceId"
      FROM "Review" r
      JOIN "BookingItem" bi ON bi.id = r."bookingItemId"
      JOIN "InventoryPricing" ip ON ip.id = bi."inventoryPricingId"
      GROUP BY ip."serviceId"
      HAVING AVG(r.rating) >= ${minRating}
    `;
    return rows.map((row) => row.serviceId);
  }

  /** No date range given -- a plain catalog browse, newest first, no price context to filter/sort by. */
  private async searchCatalog(
    where: Prisma.ServiceWhereInput,
    page: number,
    limit: number,
  ): Promise<SearchResult> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.service.findMany({
        where,
        include: searchResultInclude,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.service.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Price-based sort can't be a Prisma `orderBy` on Service (there's no
   * price column to sort by) -- it's ranked in-memory from the per-service
   * average already produced by the availability groupBy, and paginated
   * over THAT ranking, so a price-sorted page 2 is the correct next slice
   * by price rather than a re-sort of an arbitrary DB page.
   */
  private async searchSortedByPrice(
    qualifying: QualifyingService[],
    ascending: boolean,
    where: Prisma.ServiceWhereInput,
    inventoryInclude: Prisma.ServiceInclude,
    page: number,
    limit: number,
  ): Promise<SearchResult> {
    const ranked = [...qualifying].sort((a, b) =>
      ascending ? a.avgPrice - b.avgPrice : b.avgPrice - a.avgPrice,
    );
    const total = ranked.length;
    const pageIds = ranked
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map((row) => row.serviceId);

    const rows = await this.prisma.service.findMany({
      where: { ...where, id: { in: pageIds } },
      include: { ...searchResultInclude, ...inventoryInclude },
    });

    // `id: { in: [...] }` doesn't preserve array order -- re-sort the
    // fetched page to match the price ranking computed above.
    const rank = new Map(pageIds.map((id, index) => [id, index]));
    const data = rows.sort(
      (a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0),
    );

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Public -- powers the Service Details page (GET /explore -> View
   * Details). Only an active listing is visible: a deactivated Service
   * (see deactivate() above) 404s here too, same as it already silently
   * disappears from search(). `startDate`/`endDate` are optional and, like
   * search(), must be given together -- when present, the matching
   * InventoryPricing rows come back so the page can show real per-night
   * pricing for that exact range instead of nothing.
   */
  async findOne(
    id: string,
    startDate?: string,
    endDate?: string,
  ): Promise<ServiceDetail> {
    if (Boolean(startDate) !== Boolean(endDate)) {
      throw new BadRequestException(
        'startDate and endDate must be provided together.',
      );
    }

    let inventoryWhere: Prisma.InventoryPricingWhereInput | undefined;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start >= end) {
        throw new BadRequestException('endDate must be after startDate.');
      }
      inventoryWhere = { date: { gte: start, lt: end } };
    }

    const service = await this.prisma.service.findFirst({
      where: { id, isActive: true },
      include: {
        supplier: { select: { companyName: true, isVerified: true } },
        hotelDetails: true,
        tourDetails: true,
        carRentalDetails: true,
        transportDetails: true,
        inventory: inventoryWhere
          ? { where: inventoryWhere, orderBy: { date: 'asc' } }
          : false,
        ...allImagesInclude,
      },
    });

    if (!service) {
      throw new NotFoundException(`Service with id "${id}" not found.`);
    }

    return service;
  }

  private async resolveSupplierId(
    user: JwtPayload,
    requestedSupplierId?: string,
  ): Promise<string> {
    if (user.role === Role.ADMIN && requestedSupplierId) {
      const supplier = await this.prisma.supplier.findUnique({
        where: { id: requestedSupplierId },
      });
      if (!supplier) {
        throw new NotFoundException(
          `Supplier with id "${requestedSupplierId}" not found.`,
        );
      }
      return supplier.id;
    }

    const supplier = await this.prisma.supplier.findUnique({
      where: { userId: user.sub },
    });
    if (!supplier) {
      throw new NotFoundException(
        'No supplier profile found for this account. Complete your supplier profile before listing services.',
      );
    }
    return supplier.id;
  }

  private async assertOwnsService(
    serviceId: string,
    user: JwtPayload,
  ): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { supplier: true },
    });
    if (!service) {
      throw new NotFoundException(`Service with id "${serviceId}" not found.`);
    }
    if (user.role !== Role.ADMIN && service.supplier.userId !== user.sub) {
      throw new ForbiddenException('You do not own this service.');
    }
    return service;
  }
}
