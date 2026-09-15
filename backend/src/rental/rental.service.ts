import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalContractDto, ListRentalContractsQueryDto } from './rental.controller';

@Injectable()
export class RentalService {
  constructor(private readonly prisma: PrismaService) {}

  async createContract(dto: CreateRentalContractDto) {
    if (!dto.customerId || !dto.equipmentId || !dto.startDate) {
      throw new BadRequestException(
        'customerId, equipmentId, and startDate are required',
      );
    }

    const contract = await this.prisma.rentalContract.create({
      data: {
        contractNumber: dto.contractNumber ?? `RC-${Date.now()}`,
        customerId: dto.customerId,
        equipmentId: dto.equipmentId,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        rentalRate:
          dto.rentalRate != null
            ? new Prisma.Decimal(dto.rentalRate.toString())
            : null,
        depositAmount:
          dto.depositAmount != null
            ? new Prisma.Decimal(dto.depositAmount.toString())
            : null,
        status: dto.status ?? 'DRAFT',
        notes: dto.notes ?? null,
      },
      include: {
        customer: true,
        equipment: true,
      },
    });

    return contract;
  }

  async listContracts(query: ListRentalContractsQueryDto) {
    const where: any = {};

    if (query.status) {
      where.status = query.status.toUpperCase();
    }

    if (query.customerId) {
      where.customerId = query.customerId;
    }

    if (query.equipmentId) {
      where.equipmentId = query.equipmentId;
    }

    return this.prisma.rentalContract.findMany({
      where,
      orderBy: {
        startDate: 'desc',
      },
      include: {
        customer: true,
        equipment: true,
      },
    });
  }

  async processEquipmentReturn(dispatchId: string, inspectionNotes: string) {
    const dispatch = await this.prisma.equipmentDispatch.findUnique({
      where: { id: dispatchId },
      include: { equipment: true, contract: true },
    });

    if (!dispatch) {
      throw new BadRequestException(`Equipment dispatch ${dispatchId} was not found.`);
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedEquipment = await tx.equipment.update({
        where: { id: dispatch.equipmentId },
        data: {
          status: 'IN_MAINTENANCE',
        },
      });

      const serviceRequest = await tx.serviceRequest.create({
        data: {
          equipmentId: dispatch.equipmentId,
          dispatchId: dispatch.id,
          title: `Return inspection for ${dispatch.equipmentId}`,
          description: inspectionNotes || 'Returned equipment requires inspection and maintenance review.',
          requestType: 'RETURN_INSPECTION',
          status: 'OPEN',
        },
      });

      await tx.equipmentDispatch.update({
        where: { id: dispatchId },
        data: {
          status: 'INBOUND',
          notes: inspectionNotes,
        },
      });

      return {
        equipment: updatedEquipment,
        serviceRequest,
      };
    });
  }
}
