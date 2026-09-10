import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CatalogSearchResult } from '../catalog/availability-search.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApartmentSearchDto } from './dto/apartment-search.dto';
import { ApartmentsService, ApartmentWithDetails } from './apartments.service';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  // Public -- powers the Apartments listing page, no auth required.
  @Get('search')
  search(@Query() query: ApartmentSearchDto): Promise<CatalogSearchResult> {
    return this.apartmentsService.search(query);
  }

  // Supplier write path -- mirrors HotelsController.create()'s guard shape
  // (JwtAuthGuard + RolesGuard, SUPPLIER/ADMIN only).
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPLIER, Role.ADMIN)
  @Post()
  create(
    @Body() dto: CreateApartmentDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<ApartmentWithDetails> {
    return this.apartmentsService.create(dto, user);
  }
}
