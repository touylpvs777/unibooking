import { randomBytes } from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierOwnershipService } from '../catalog/supplier-ownership.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const HOLD_MINUTES = 15;

// What every booking read returns -- the guest's own line items plus enough
// of the underlying service to render a confirmation, without dragging the
// customer's password_hash or the supplier's contact details along.
const bookingInclude = {
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

export type BookingWithItems = Prisma.BookingGetPayload<{
  include: typeof bookingInclude;
}>;

// GET /bookings/supplier's own shape -- same as bookingInclude, plus the
// guest's name/email, matching AdminService's adminBookingInclude (see
// src/admin/admin.service.ts). findMine()/createBooking() don't need this:
// a customer reading their own booking already knows who they are.
const supplierBookingInclude = {
  ...bookingInclude,
  user: {
    select: { id: true, email: true, firstName: true, lastName: true },
  },
} satisfies Prisma.BookingInclude;

export type BookingWithItemsAndUser = Prisma.BookingGetPayload<{
  include: typeof supplierBookingInclude;
}>;

/** One Date per night in [startDate, endDate) -- checkout day itself excluded. */
function nightsBetween(startDate: string, endDate: string): Date[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const nights: Date[] = [];
  for (let t = start.getTime(); t < end.getTime(); t += MS_PER_DAY) {
    nights.push(new Date(t));
  }
  return nights;
}

function generateBookingReference(): string {
  return `BK-${randomBytes(4).toString('hex').toUpperCase()}`;
}

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supplierOwnership: SupplierOwnershipService,
  ) {}

  /**
   * The overbooking-safe path. Everything -- availability check, total
   * calculation, inventory decrement, and the Booking/BookingItem insert --
   * happens inside one interactive $transaction, so a failure at any step
   * (including another request winning a race for the last unit) rolls back
   * every decrement already applied in this call. Nothing here blindly
   * targets a row assumed to exist, so there's no manual P2025 handling to
   * add -- the global PrismaClientExceptionFilter (see
   * common/filters/prisma-client-exception.filter.ts) is the backstop for
   * anything unexpected the checks below don't already catch.
   */
  async createBooking(
    dto: CreateBookingDto,
    user: JwtPayload,
  ): Promise<BookingWithItems> {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    if (start >= end) {
      throw new BadRequestException('endDate must be after startDate.');
    }

    const nights = nightsBetween(dto.startDate, dto.endDate);

    return this.prisma.$transaction(async (tx) => {
      // 1. Verify availability -- re-read InventoryPricing inside the
      // transaction so it reflects the latest committed state, not a value
      // fetched before the transaction opened.
      const rows = await tx.inventoryPricing.findMany({
        where: {
          serviceId: dto.serviceId,
          date: { gte: start, lt: end },
        },
      });
      const rowsByDate = new Map(rows.map((row) => [row.date.getTime(), row]));

      for (const night of nights) {
        const isoDate = night.toISOString().slice(0, 10);
        const row = rowsByDate.get(night.getTime());
        if (!row) {
          throw new BadRequestException(
            `No pricing/availability configured for ${isoDate}.`,
          );
        }
        if (row.availableUnits < dto.units) {
          throw new BadRequestException(
            `Only ${row.availableUnits} unit(s) left on ${isoDate}, requested ${dto.units}.`,
          );
        }
      }

      // 2. Calculate total -- price is locked in from what's on the row
      // right now, not recomputed later, so a supplier changing tomorrow's
      // rate never rewrites an already-placed booking's total.
      const totalPrice = rows.reduce(
        (sum, row) => sum + Number(row.price) * dto.units,
        0,
      );

      // 3. Decrement inventory. Repeating the `>= units` check in the WHERE
      // clause (not just in step 1) is what makes this atomic: Postgres
      // serializes concurrent UPDATEs against the same row, so a second
      // transaction's updateMany re-evaluates this condition against the
      // first transaction's already-committed decrement rather than a
      // stale read. If two requests race for the last unit, exactly one of
      // these calls affects 0 rows, and that request's entire transaction
      // -- including any decrements already applied to *other* dates in
      // this same booking -- rolls back instead of silently overselling.
      for (const row of rows) {
        const result = await tx.inventoryPricing.updateMany({
          where: { id: row.id, availableUnits: { gte: dto.units } },
          data: { availableUnits: { decrement: dto.units } },
        });
        if (result.count === 0) {
          const isoDate = row.date.toISOString().slice(0, 10);
          throw new BadRequestException(
            `Availability for ${isoDate} was taken by another booking -- please try again.`,
          );
        }
      }

      // 4. Create the booking, held pending payment until HOLD_MINUTES
      // elapses (a later phase's BullMQ job releases the hold on expiry).
      return tx.booking.create({
        data: {
          bookingReference: generateBookingReference(),
          userId: user.sub,
          status: BookingStatus.PENDING,
          totalPrice,
          expiresAt: new Date(Date.now() + HOLD_MINUTES * 60 * 1000),
          items: {
            create: rows.map((row) => ({
              inventoryPricingId: row.id,
              quantity: dto.units,
              unitPrice: row.price,
            })),
          },
        },
        include: bookingInclude,
      });
    });
  }

  findMine(user: JwtPayload): Promise<BookingWithItems[]> {
    return this.prisma.booking.findMany({
      where: { userId: user.sub },
      include: bookingInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // `requestedSupplierId` is only honoured for ADMIN (see
  // SupplierOwnershipService.resolveSupplierId's own doc comment) -- a
  // SUPPLIER caller always sees their own bookings regardless of what they
  // send here.
  async findForSupplier(
    user: JwtPayload,
    requestedSupplierId?: string,
  ): Promise<BookingWithItemsAndUser[]> {
    const supplierId = await this.supplierOwnership.resolveSupplierId(
      user,
      requestedSupplierId,
    );

    return this.prisma.booking.findMany({
      where: {
        items: {
          some: { inventoryPricing: { service: { supplierId } } },
        },
      },
      include: supplierBookingInclude,
      orderBy: { createdAt: 'desc' },
    });
  }
}
