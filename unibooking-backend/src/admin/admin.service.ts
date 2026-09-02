import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus, Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { ListBookingsQueryDto } from './dto/list-bookings-query.dto';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';

export type SafeUser = Omit<User, 'password_hash'>;

export interface AdminStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number | null;
  bookingsByStatus: Record<BookingStatus, number>;
}

// Admin needs both sides Phase 04's own BookingsService deliberately
// doesn't include together: the customer (user) AND the service, in one
// listing. Kept local to this module rather than extending BookingsModule's
// include, since that shape is intentionally scoped to what a customer/
// supplier is allowed to see about their own booking.
const adminBookingInclude = {
  user: {
    select: { id: true, email: true, firstName: true, lastName: true },
  },
  items: {
    include: {
      inventoryPricing: {
        include: {
          service: {
            select: {
              id: true,
              name: true,
              type: true,
              location: true,
              supplierId: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.BookingInclude;

export type AdminBooking = Prisma.BookingGetPayload<{
  include: typeof adminBookingInclude;
}>;

export interface PaginatedBookings {
  data: AdminBooking[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * One transaction round trip: total counts/sum/avg plus one `count()` per
   * BookingStatus for the dashboard's status breakdown -- `groupBy` would
   * do this in a single query, but its TS overloads don't narrow `_count`'s
   * shape cleanly here, and four cheap indexed counts inside the same
   * transaction cost nothing extra worth trading type-safety for.
   */
  async getStats(): Promise<AdminStats> {
    const statuses = Object.values(BookingStatus);

    const [totalUsers, totalBookings, revenue, ratingAggregate, ...statusCounts] =
      await this.prisma.$transaction([
        this.prisma.user.count(),
        this.prisma.booking.count(),
        this.prisma.booking.aggregate({
          // CONFIRMED and COMPLETED both represent money actually taken --
          // PENDING is an unpaid hold and CANCELLED never converted, so
          // neither belongs in revenue (same rule the supplier dashboard
          // applies to its own totalRevenue, see pages/supplier/index.vue).
          where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] } },
          _sum: { totalPrice: true },
        }),
        this.prisma.review.aggregate({ _avg: { rating: true } }),
        ...statuses.map((status) => this.prisma.booking.count({ where: { status } })),
      ]);

    const bookingsByStatus = Object.fromEntries(
      statuses.map((status, index) => [status, statusCounts[index]]),
    ) as Record<BookingStatus, number>;

    return {
      totalUsers,
      totalBookings,
      totalRevenue: Number(revenue._sum.totalPrice ?? 0),
      averageRating:
        ratingAggregate._avg.rating === null
          ? null
          : Number(ratingAggregate._avg.rating.toFixed(2)),
      bookingsByStatus,
    };
  }

  async listBookings(query: ListBookingsQueryDto): Promise<PaginatedBookings> {
    const { page, limit } = query;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.booking.findMany({
        include: adminBookingInclude,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.booking.count(),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * A pure role flip -- deliberately does NOT touch Supplier/Booking/etc
   * rows. A CUSTOMER promoted to SUPPLIER has no Supplier profile yet,
   * exactly like a user who self-registered and hasn't onboarded --
   * they still call POST /suppliers/profile themselves afterward, which is
   * exactly what that endpoint (Phase 03.5) already exists to handle. This
   * method's only job is making them eligible to call it (RolesGuard now
   * passes for Role.SUPPLIER-gated routes); creating the Supplier row is
   * intentionally left to that endpoint, not duplicated here.
   */
  async updateUserRole(
    targetUserId: string,
    dto: UpdateUserRoleDto,
    admin: JwtPayload,
  ): Promise<SafeUser> {
    if (targetUserId === admin.sub) {
      throw new BadRequestException(
        'You cannot change your own role through this endpoint.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });
    if (!user) {
      throw new NotFoundException(`User with id "${targetUserId}" not found.`);
    }

    const updated = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { role: dto.role },
    });
    return this.toSafeUser(updated);
  }

  /**
   * Flips User.isActive -- note this doesn't take effect until the user's
   * current JWT expires or they log in again. JwtStrategy deliberately
   * doesn't hit the database on every request (see its own docstring on
   * that exact tradeoff), so a banned user's already-issued cookie keeps
   * authenticating until it naturally expires (JWT_EXPIRES_IN, 1 day by
   * default). If instant revocation ever becomes a hard requirement,
   * that's a token-lifetime/revocation change to make there, not something
   * to bolt on here.
   */
  async updateUserStatus(
    targetUserId: string,
    dto: UpdateUserStatusDto,
    admin: JwtPayload,
  ): Promise<SafeUser> {
    if (targetUserId === admin.sub) {
      throw new BadRequestException(
        'You cannot change your own account status through this endpoint.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });
    if (!user) {
      throw new NotFoundException(`User with id "${targetUserId}" not found.`);
    }

    const updated = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { isActive: dto.isActive },
    });
    return this.toSafeUser(updated);
  }

  private toSafeUser(user: User): SafeUser {
    const safeUser: Partial<User> = { ...user };
    delete safeUser.password_hash;
    return safeUser as SafeUser;
  }
}
