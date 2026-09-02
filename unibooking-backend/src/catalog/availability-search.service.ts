import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export enum CatalogSortBy {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  NEWEST = 'newest',
}

export interface CatalogSearchParams {
  /** Vertical's own where-clause: `type`, `location`, plus its detail-relation filters. */
  baseWhere: Prisma.ServiceWhereInput;
  /** e.g. `{ hotelDetails: true }` -- merged into every result row's `include`. */
  detailInclude?: Prisma.ServiceInclude;
  /**
   * Single-day verticals (transport, a tour's departure date) pass the same
   * value for both -- widened below to a one-day [date, date+1) window, the
   * same shape a real multi-night stay uses.
   */
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: CatalogSortBy;
  page: number;
  limit: number;
}

export interface CatalogSearchResult<T = unknown> {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

interface QualifyingService {
  serviceId: string;
  avgPrice: number;
}

// `images` capped to 1 (the oldest, i.e. cover photo) -- same reasoning as
// ServicesService's own searchResultInclude: these rows feed a card list,
// not a gallery.
const supplierInclude = {
  supplier: { select: { companyName: true, isVerified: true } },
  images: { orderBy: { createdAt: 'asc' }, take: 1 },
} satisfies Prisma.ServiceInclude;

/**
 * The one place that knows how to answer "which services have real
 * availability across a date range, at what price" against InventoryPricing
 * -- lifted out of ServicesService.search() (unibooking-backend's original
 * generic /services/search) so every vertical controller (Hotels, Transport,
 * Tours, CarRentals) shares this instead of reimplementing the
 * overbooking-safe groupBy/price-sort logic four more times.
 *
 * A vertical service supplies its own `baseWhere` (type + its detail-relation
 * filters) and `detailInclude` (which 1:1 detail table to attach to results);
 * this class owns everything date/price/pagination-related.
 */
@Injectable()
export class AvailabilitySearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(params: CatalogSearchParams): Promise<CatalogSearchResult> {
    const {
      baseWhere,
      detailInclude = {},
      startDate,
      endDate,
      minPrice,
      maxPrice,
      sortBy,
      page,
      limit,
    } = params;

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

    const resultInclude: Prisma.ServiceInclude = {
      ...supplierInclude,
      ...detailInclude,
    };

    const sortingByPrice =
      sortBy === CatalogSortBy.PRICE_ASC || sortBy === CatalogSortBy.PRICE_DESC;
    const needsDateRange =
      minPrice !== undefined || maxPrice !== undefined || sortingByPrice;
    if (needsDateRange && !(startDate && endDate)) {
      throw new BadRequestException(
        'minPrice, maxPrice, and price-based sorting all require a date ' +
          '(startDate/endDate) -- price is set per day on InventoryPricing, not per service.',
      );
    }

    if (!startDate || !endDate) {
      return this.searchCatalog(baseWhere, resultInclude, page, limit);
    }

    const start = new Date(startDate);
    let end = new Date(endDate);
    if (start.getTime() === end.getTime()) {
      // Single-day vertical (transport departure date, tour start date,
      // car-rental pickup==return day) -- treat as a one-day window rather
      // than an instantly-empty [x, x) range.
      end = new Date(start.getTime() + MS_PER_DAY);
    }
    if (start >= end) {
      throw new BadRequestException('endDate must be after startDate.');
    }
    const requestedDays = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);

    // One groupBy answers both "does every day in range have stock" and
    // "what does it cost on average" -- price filtering/sorting piggybacks
    // on the same query instead of a second round-trip.
    const availability = await this.prisma.inventoryPricing.groupBy({
      by: ['serviceId'],
      where: { date: { gte: start, lt: end }, availableUnits: { gt: 0 } },
      _count: { _all: true },
      _avg: { price: true },
    });

    const qualifying: QualifyingService[] = availability
      .filter((row) => row._count._all === requestedDays)
      .map((row) => ({
        serviceId: row.serviceId,
        avgPrice: Number(row._avg.price ?? 0),
      }))
      .filter((row) => minPrice === undefined || row.avgPrice >= minPrice)
      .filter((row) => maxPrice === undefined || row.avgPrice <= maxPrice);

    if (qualifying.length === 0) {
      return { data: [], meta: { page, limit, total: 0, totalPages: 0 } };
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
        sortBy === CatalogSortBy.PRICE_ASC,
        baseWhere,
        { ...resultInclude, ...inventoryInclude },
        page,
        limit,
      );
    }

    const scopedWhere: Prisma.ServiceWhereInput = {
      ...baseWhere,
      id: { in: qualifying.map((row) => row.serviceId) },
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.service.findMany({
        where: scopedWhere,
        include: { ...resultInclude, ...inventoryInclude },
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

  private async searchCatalog(
    where: Prisma.ServiceWhereInput,
    include: Prisma.ServiceInclude,
    page: number,
    limit: number,
  ): Promise<CatalogSearchResult> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.service.findMany({
        where,
        include,
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

  private async searchSortedByPrice(
    qualifying: QualifyingService[],
    ascending: boolean,
    where: Prisma.ServiceWhereInput,
    include: Prisma.ServiceInclude,
    page: number,
    limit: number,
  ): Promise<CatalogSearchResult> {
    const ranked = [...qualifying].sort((a, b) =>
      ascending ? a.avgPrice - b.avgPrice : b.avgPrice - a.avgPrice,
    );
    const total = ranked.length;
    const pageIds = ranked
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map((row) => row.serviceId);

    const rows = await this.prisma.service.findMany({
      where: { ...where, id: { in: pageIds } },
      include,
    });

    const rank = new Map(pageIds.map((id, index) => [id, index]));
    const data = rows.sort(
      (a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0),
    );

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
