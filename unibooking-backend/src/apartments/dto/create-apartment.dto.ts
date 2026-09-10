import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BaseCatalogCreateDto } from '../../catalog/dto/base-catalog-create.dto';

export class CreateApartmentDto extends BaseCatalogCreateDto {
  @IsInt()
  @Min(0)
  @Max(20)
  bedrooms!: number;

  @IsInt()
  @Min(1)
  @Max(20)
  bathrooms!: number;

  @IsOptional()
  @IsBoolean()
  hasKitchen?: boolean;

  @IsInt()
  @Min(1)
  @Max(50)
  maxGuests!: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  amenities?: string[];
}
