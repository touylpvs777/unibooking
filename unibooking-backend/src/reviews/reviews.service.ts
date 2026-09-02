import { ForbiddenException, Injectable } from '@nestjs/common';
import { BookingStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierOwnershipService } from '../catalog/supplier-ownership.service';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsQueryDto } from './dto/reviews-query.dto';

const reviewUserSelect = {
  user: { select: { firstName: true, lastName: true } },
} satisfies Prisma.ReviewInclude;

type ReviewRow = Prisma.ReviewGetPayload<{ include: typeof reviewUserSelect }>;

export interface ReviewDto {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: { displayName: string };
}

export interface ReviewsResult {
  data: ReviewDto[];
  meta: { page: number; limit: number; total: number; totalPages: number };
  averageRating: number | null;
  reviewCount: number;
}

export interface SupplierRatingSummary {
  averageRating: number | null;
  reviewCount: number;
}

/**
 * "John D." -- first name plus last-initial, not the full last name. This is
 * a public endpoint (GET /services/:serviceId/reviews needs no auth), so
 * full names are deliberately not exposed here even though ReviewsService
 * has them via the `user` relation.
 */
function toReviewDto(review: ReviewRow): ReviewDto {
  const lastInitial = review.user.lastName ? `${review.user.lastName.charAt(0)}.` : '';
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
    user: { displayName: [review.user.firstName, lastInitial].filter(Boolean).join(' ') },
  };
}

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supplierOwnership: SupplierOwnershipService,
  ) {}

  /**
   * Review is keyed by bookingItemId (unique), not serviceId -- see the
   * Review model in schema.prisma -- so "does this user have a COMPLETED
   * booking for this service" resolves to "find an eligible, not-yet-
   * reviewed BookingItem for this user+service" rather than a simple
   * existence check. Deliberately picks any one eligible item (oldest
   * first) rather than requiring the client to name a bookingItemId it has
   * no reason to know about.
   *
   * The eligibility check and the insert aren't wrapped in a transaction:
   * the true guard against double-reviewing the same stay is the
   * @@unique constraint Review.bookingItemId already has in the schema. A
   * race between two concurrent requests for the same last-eligible item
   * surfaces as a P2002, which the app's global PrismaClientExceptionFilter
   * already turns into a clean 409 -- no extra handling needed here.
   */
  async create(dto: CreateReviewDto, user: JwtPayload): Promise<ReviewDto> {
    const eligibleItem = await this.prisma.bookingItem.findFirst({
      where: {
        review: null,
        booking: { userId: user.sub, status: BookingStatus.COMPLETED },
        inventoryPricing: { serviceId: dto.serviceId },
      },
      orderBy: { id: 'asc' },
    });

    if (!eligibleItem) {
      throw new ForbiddenException(
        'You can only review a service after completing a booking for it, and each completed stay can only be reviewed once.',
      );
    }

    const review = await this.prisma.review.create({
      data: {
        userId: user.sub,
        bookingItemId: eligibleItem.id,
        rating: dto.rating,
        comment: dto.comment,
      },
      include: reviewUserSelect,
    });

    return toReviewDto(review);
  }

  async findForService(serviceId: string, query: ReviewsQueryDto): Promise<ReviewsResult> {
    const { page, limit } = query;
    const where: Prisma.ReviewWhereInput = {
      bookingItem: { inventoryPricing: { serviceId } },
    };

    const [rows, total, aggregate] = await this.prisma.$transaction([
      this.prisma.review.findMany({
        where,
        include: reviewUserSelect,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.review.count({ where }),
      this.prisma.review.aggregate({ where, _avg: { rating: true } }),
    ]);

    return {
      data: rows.map(toReviewDto),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
      averageRating: aggregate._avg.rating === null ? null : Number(aggregate._avg.rating.toFixed(2)),
      reviewCount: total,
    };
  }

  /**
   * Powers the supplier dashboard's "Average Rating" stat -- every review
   * across every service this supplier owns, not scoped to one service
   * (unlike findForService above). `requestedSupplierId` is only honoured
   * for ADMIN, same escape hatch as ServicesService/BookingsService.
   */
  async getSupplierSummary(
    user: JwtPayload,
    requestedSupplierId?: string,
  ): Promise<SupplierRatingSummary> {
    const supplierId = await this.supplierOwnership.resolveSupplierId(
      user,
      requestedSupplierId,
    );

    const aggregate = await this.prisma.review.aggregate({
      where: { bookingItem: { inventoryPricing: { service: { supplierId } } } },
      _avg: { rating: true },
      _count: true,
    });

    return {
      averageRating: aggregate._avg.rating === null ? null : Number(aggregate._avg.rating.toFixed(2)),
      reviewCount: aggregate._count,
    };
  }
}
