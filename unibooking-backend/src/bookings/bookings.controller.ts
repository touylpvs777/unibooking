import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import {
  BookingsService,
  BookingWithItems,
  BookingWithItemsAndUser,
} from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Any authenticated account may book -- not role-restricted to CUSTOMER,
  // since nothing in the domain stops a SUPPLIER or ADMIN account from also
  // booking a service as a guest.
  @UseGuards(JwtAuthGuard)
  @Post()
  createBooking(
    @Body() dto: CreateBookingDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<BookingWithItems> {
    return this.bookingsService.createBooking(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMine(@CurrentUser() user: JwtPayload): Promise<BookingWithItems[]> {
    return this.bookingsService.findMine(user);
  }

  // Supplier portal's bookings table. `supplierId` is only honoured for
  // ADMIN, same escape hatch as GET /services/me.
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPLIER, Role.ADMIN)
  @Get('supplier')
  findForSupplier(
    @CurrentUser() user: JwtPayload,
    @Query('supplierId') supplierId?: string,
  ): Promise<BookingWithItemsAndUser[]> {
    return this.bookingsService.findForSupplier(user, supplierId);
  }
}
