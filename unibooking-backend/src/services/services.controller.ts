import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Image, InventoryPricing, Role, Service } from '@prisma/client';
import {
  ServicesService,
  SearchResult,
  ServiceDetail,
  ServiceWithDetails,
} from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { AddInventoryDto } from './dto/add-inventory.dto';
import { AddImagesDto } from './dto/add-images.dto';
import { SearchServicesQueryDto } from './dto/search-services-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Public -- powers the storefront's search/listing page, no auth required.
  @Get('search')
  search(@Query() query: SearchServicesQueryDto): Promise<SearchResult> {
    return this.servicesService.search(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPLIER, Role.ADMIN)
  @Post()
  create(
    @Body() dto: CreateServiceDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Service> {
    return this.servicesService.create(dto, user);
  }

  // Supplier portal's inventory table -- the current user's own Services
  // (any type) with vertical details. `supplierId` is only honoured for
  // ADMIN (see ServicesService.resolveSupplierId's ADMIN-on-behalf-of-a-
  // supplier path, the same private helper create() already uses); a
  // SUPPLIER always gets their own.
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPLIER, Role.ADMIN)
  @Get('me')
  findMine(
    @CurrentUser() user: JwtPayload,
    @Query('supplierId') supplierId?: string,
  ): Promise<ServiceWithDetails[]> {
    return this.servicesService.findMyServices(user, supplierId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPLIER, Role.ADMIN)
  @Patch(':id/deactivate')
  deactivate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<Service> {
    return this.servicesService.deactivate(id, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPLIER, Role.ADMIN)
  @Post(':id/inventory')
  addInventory(
    @Param('id', ParseUUIDPipe) serviceId: string,
    @Body() dto: AddInventoryDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<InventoryPricing[]> {
    return this.servicesService.addInventory(serviceId, dto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPLIER, Role.ADMIN)
  @Post(':id/images')
  addImages(
    @Param('id', ParseUUIDPipe) serviceId: string,
    @Body() dto: AddImagesDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Image[]> {
    return this.servicesService.addImages(serviceId, dto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPLIER, Role.ADMIN)
  @Delete(':id/images/:imageId')
  @HttpCode(204)
  removeImage(
    @Param('id', ParseUUIDPipe) serviceId: string,
    @Param('imageId', ParseUUIDPipe) imageId: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<void> {
    return this.servicesService.removeImage(serviceId, imageId, user);
  }

  // Public -- powers the Service Details page. Declared LAST among this
  // controller's @Get() routes on purpose: Nest/Express matches routes in
  // declaration order, so 'search' and 'me' above must stay registered
  // before this bare ':id' catch-all or requests to those two literal
  // paths would incorrectly match here instead (with "search"/"me" as the
  // :id value).
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<ServiceDetail> {
    return this.servicesService.findOne(id, startDate, endDate);
  }
}
