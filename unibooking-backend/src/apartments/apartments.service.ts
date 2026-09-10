import { Injectable } from '@nestjs/common';
import { ApartmentDetails, Prisma, Service, ServiceType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  AvailabilitySearchService,
  CatalogSearchResult,
} from '../catalog/availability-search.service';
import { SupplierOwnershipService } from '../catalog/supplier-ownership.service';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApartmentSearchDto } from './dto/apartment-search.dto';

export type ApartmentWithDetails = Service & {
  apartmentDetails: ApartmentDetails;
};

@Injectable()
export class ApartmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly availabilitySearch: AvailabilitySearchService,
    private readonly supplierOwnership: SupplierOwnershipService,
  ) {}

  /**
   * Atomically creates the parent Service row and its ApartmentDetails child
   * -- both or neither, same reasoning as HotelsService.create.
   */
  async create(
    dto: CreateApartmentDto,
    user: JwtPayload,
  ): Promise<ApartmentWithDetails> {
    const supplierId = await this.supplierOwnership.resolveSupplierId(
      user,
      dto.supplierId,
    );

    return this.prisma.$transaction(async (tx) => {
      const service = await tx.service.create({
        data: {
          supplierId,
          type: ServiceType.APARTMENT,
          name: dto.name,
          description: dto.description,
          location: dto.location,
        },
      });

      const apartmentDetails = await tx.apartmentDetails.create({
        data: {
          serviceId: service.id,
          bedrooms: dto.bedrooms,
          bathrooms: dto.bathrooms,
          hasKitchen: dto.hasKitchen ?? true,
          maxGuests: dto.maxGuests,
          amenities: dto.amenities ?? [],
        },
      });

      return { ...service, apartmentDetails };
    });
  }

  search(dto: ApartmentSearchDto): Promise<CatalogSearchResult> {
    const detailFilters: Prisma.ApartmentDetailsWhereInput = {};
    if (dto.bedrooms !== undefined) {
      detailFilters.bedrooms = { gte: dto.bedrooms };
    }
    if (dto.maxGuests !== undefined) {
      detailFilters.maxGuests = { gte: dto.maxGuests };
    }
    if (dto.amenities?.length) {
      detailFilters.amenities = { hasEvery: dto.amenities };
    }

    const baseWhere: Prisma.ServiceWhereInput = {
      isActive: true,
      type: ServiceType.APARTMENT,
      ...(dto.location && {
        location: { contains: dto.location, mode: 'insensitive' },
      }),
      ...(Object.keys(detailFilters).length && {
        apartmentDetails: detailFilters,
      }),
    };

    return this.availabilitySearch.search({
      baseWhere,
      detailInclude: { apartmentDetails: true },
      startDate: dto.checkInDate,
      endDate: dto.checkOutDate,
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      sortBy: dto.sortBy,
      page: dto.page,
      limit: dto.limit,
    });
  }
}
