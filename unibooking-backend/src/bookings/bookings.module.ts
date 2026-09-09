import { Module } from '@nestjs/common';
import { CatalogCommonModule } from '../catalog/catalog-common.module';
import { PaymentsModule } from '../payments/payments.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [CatalogCommonModule, PaymentsModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
