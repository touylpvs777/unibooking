import { Module } from '@nestjs/common';
import { RentalModule } from './rental/rental.module';

@Module({
  imports: [RentalModule],
})
export class AppModule {}
