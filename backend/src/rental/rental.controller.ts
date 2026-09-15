import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RentalService } from './rental.service';

export class CreateRentalContractDto {
  contractNumber?: string;
  customerId: string;
  equipmentId: string;
  startDate: string;
  endDate?: string;
  rentalRate?: number;
  depositAmount?: number;
  status?: string;
  notes?: string;
}

export class ListRentalContractsQueryDto {
  status?: string;
  customerId?: string;
  equipmentId?: string;
}

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post('contracts')
  createContract(@Body() dto: CreateRentalContractDto) {
    return this.rentalService.createContract(dto);
  }

  @Get('contracts')
  listContracts(@Query() query: ListRentalContractsQueryDto) {
    return this.rentalService.listContracts(query);
  }
}
