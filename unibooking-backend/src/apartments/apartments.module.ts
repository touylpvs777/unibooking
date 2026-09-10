import { Module } from '@nestjs/common';
import { CatalogCommonModule } from '../catalog/catalog-common.module';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';

@Module({
  imports: [CatalogCommonModule],
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
})
export class ApartmentsModule {}
