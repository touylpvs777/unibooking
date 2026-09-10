import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BaseCatalogSearchDto } from '../../catalog/dto/base-catalog-search.dto';

/** Accepts `?amenities=WiFi,Pool` or repeated `?amenities=WiFi&amenities=Pool` -- same convention as HotelSearchDto. */
function toStringArray({ value }: { value: unknown }): string[] | undefined {
  if (value === undefined) return undefined;
  const raw = Array.isArray(value) ? value : [value];
  return raw
    .flatMap((entry) => String(entry).split(','))
    .map((s) => s.trim())
    .filter(Boolean);
}

export class ApartmentSearchDto extends BaseCatalogSearchDto {
  @IsOptional()
  @IsDateString()
  checkInDate?: string;

  @IsOptional()
  @IsDateString()
  checkOutDate?: string;

  /** Minimum bedroom count -- e.g. bedrooms=2 returns 2+ bedroom apartments. */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(20)
  bedrooms?: number;

  /** Minimum guest capacity. */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  maxGuests?: number;

  /** Must have ALL listed amenities (Prisma `hasEvery`), not merely one. */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(toStringArray)
  amenities?: string[];
}
