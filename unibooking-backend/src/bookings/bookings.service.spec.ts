import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookingStatus, Prisma, Role } from '@prisma/client';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierOwnershipService } from '../catalog/supplier-ownership.service';
import {
  createPrismaMock,
  mockPrismaTransactions,
  MockPrisma,
  resetPrismaMock,
} from '../test-utils/prisma-mock';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';

const CUSTOMER: JwtPayload = {
  sub: 'user-1',
  email: 'guest@example.com',
  role: Role.CUSTOMER,
};

const SERVICE_ID = 'service-1';

/** Matches how BookingsService.nightsBetween() computes night boundaries: midnight-UTC Date per night, end exclusive. */
function night(iso: string) {
  return new Date(iso);
}

function inventoryRow(date: string, price: number, availableUnits: number) {
  return {
    id: `inv-${date}`,
    serviceId: SERVICE_ID,
    date: night(date),
    availableUnits,
    price: new Prisma.Decimal(price), // InventoryPricing.price is Decimal, not a plain number
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

describe('BookingsService', () => {
  let service: BookingsService;
  let prismaMock: MockPrisma;

  beforeEach(async () => {
    prismaMock = createPrismaMock();
    mockPrismaTransactions(prismaMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        // Real (unmocked) instance -- it only calls prisma.supplier.findUnique,
        // which the findForSupplier tests below already mock via prismaMock,
        // so this behaves identically to the inline lookup it replaced.
        SupplierOwnershipService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get(BookingsService);
  });

  afterEach(() => {
    resetPrismaMock(prismaMock);
  });

  describe('createBooking', () => {
    const dto: CreateBookingDto = {
      serviceId: SERVICE_ID,
      startDate: '2026-01-10',
      endDate: '2026-01-12', // 2 nights: the 10th and the 11th (endDate itself excluded)
      units: 2,
    };

    it('rejects a range where endDate is not after startDate, before ever opening a transaction', async () => {
      const badDto: CreateBookingDto = { ...dto, startDate: '2026-01-12', endDate: '2026-01-12' };

      await expect(service.createBooking(badDto, CUSTOMER)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('rejects when a night in the range has no InventoryPricing row at all', async () => {
      // Only the first of the two required nights has a row.
      prismaMock.inventoryPricing.findMany.mockResolvedValue([
        inventoryRow('2026-01-10', 100000, 5),
      ]);

      await expect(service.createBooking(dto, CUSTOMER)).rejects.toThrow(
        /No pricing\/availability configured for 2026-01-11/,
      );
      expect(prismaMock.booking.create).not.toHaveBeenCalled();
    });

    it('rejects when requested units exceed a night\'s availableUnits', async () => {
      prismaMock.inventoryPricing.findMany.mockResolvedValue([
        inventoryRow('2026-01-10', 100000, 5),
        inventoryRow('2026-01-11', 100000, 1), // only 1 left, dto.units is 2
      ]);

      await expect(service.createBooking(dto, CUSTOMER)).rejects.toThrow(
        /Only 1 unit\(s\) left on 2026-01-11/,
      );
      expect(prismaMock.booking.create).not.toHaveBeenCalled();
    });

    it('rejects (without creating a booking) when a concurrent request wins the race for a night\'s stock', async () => {
      const rows = [
        inventoryRow('2026-01-10', 100000, 5),
        inventoryRow('2026-01-11', 150000, 5),
      ];
      prismaMock.inventoryPricing.findMany.mockResolvedValue(rows);
      // First decrement succeeds, second loses the race (0 rows affected --
      // another transaction already took the last unit between the read
      // above and this update).
      prismaMock.inventoryPricing.updateMany
        .mockResolvedValueOnce({ count: 1 })
        .mockResolvedValueOnce({ count: 0 });

      await expect(service.createBooking(dto, CUSTOMER)).rejects.toThrow(
        /Availability for 2026-01-11 was taken by another booking/,
      );
      expect(prismaMock.booking.create).not.toHaveBeenCalled();
    });

    it('creates a PENDING booking with the correct total price, a hold expiry, and one item per night', async () => {
      const rows = [
        inventoryRow('2026-01-10', 100000, 5),
        inventoryRow('2026-01-11', 150000, 5),
      ];
      prismaMock.inventoryPricing.findMany.mockResolvedValue(rows);
      prismaMock.inventoryPricing.updateMany.mockResolvedValue({ count: 1 });

      const createdBooking = { id: 'booking-1', bookingReference: 'BK-TEST0001' };
      prismaMock.booking.create.mockResolvedValue(createdBooking as never);

      const before = Date.now();
      const result = await service.createBooking(dto, CUSTOMER);
      const after = Date.now();

      expect(result).toBe(createdBooking);

      // Both nights' stock was decremented by dto.units, each guarded by
      // the same `availableUnits >= units` condition the pre-check used.
      expect(prismaMock.inventoryPricing.updateMany).toHaveBeenCalledTimes(2);
      expect(prismaMock.inventoryPricing.updateMany).toHaveBeenCalledWith({
        where: { id: 'inv-2026-01-10', availableUnits: { gte: dto.units } },
        data: { availableUnits: { decrement: dto.units } },
      });
      expect(prismaMock.inventoryPricing.updateMany).toHaveBeenCalledWith({
        where: { id: 'inv-2026-01-11', availableUnits: { gte: dto.units } },
        data: { availableUnits: { decrement: dto.units } },
      });

      expect(prismaMock.booking.create).toHaveBeenCalledTimes(1);
      const createArg = prismaMock.booking.create.mock.calls[0][0];

      // total = (100000 * 2) + (150000 * 2) = 500000 -- price is locked in
      // per-night from InventoryPricing.price at booking time, not
      // recomputed from anything mutable later.
      expect(createArg.data.totalPrice).toBe(500000);
      expect(createArg.data.status).toBe(BookingStatus.PENDING);
      expect(createArg.data.userId).toBe(CUSTOMER.sub);

      // 15-minute hold, allowing a little slack for test execution time.
      const expiresAt = createArg.data.expiresAt as Date;
      expect(expiresAt.getTime()).toBeGreaterThanOrEqual(before + 15 * 60 * 1000 - 1000);
      expect(expiresAt.getTime()).toBeLessThanOrEqual(after + 15 * 60 * 1000 + 1000);

      const items = createArg.data.items!.create as Array<{
        inventoryPricingId: string;
        quantity: number;
        unitPrice: Prisma.Decimal;
      }>;
      expect(items).toHaveLength(2);
      // unitPrice is a Prisma.Decimal instance (passed through from the
      // InventoryPricing row as-is) -- compare numerically, not via toEqual
      // against a plain number, which a Decimal never structurally matches.
      expect(
        items.map((item) => ({
          inventoryPricingId: item.inventoryPricingId,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
        })),
      ).toEqual(
        expect.arrayContaining([
          { inventoryPricingId: 'inv-2026-01-10', quantity: dto.units, unitPrice: 100000 },
          { inventoryPricingId: 'inv-2026-01-11', quantity: dto.units, unitPrice: 150000 },
        ]),
      );
    });
  });

  describe('findForSupplier', () => {
    it('throws NotFoundException when the caller has no supplier profile', async () => {
      prismaMock.supplier.findUnique.mockResolvedValue(null);

      await expect(service.findForSupplier(CUSTOMER)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.booking.findMany).not.toHaveBeenCalled();
    });

    it('scopes results to bookings containing that supplier\'s services', async () => {
      prismaMock.supplier.findUnique.mockResolvedValue({ id: 'supplier-1' } as never);
      prismaMock.booking.findMany.mockResolvedValue([]);

      await service.findForSupplier(CUSTOMER);

      expect(prismaMock.booking.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            items: {
              some: { inventoryPricing: { service: { supplierId: 'supplier-1' } } },
            },
          },
        }),
      );
    });
  });
});
