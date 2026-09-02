import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ServiceType } from '@prisma/client';

export enum ServiceSortBy {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  NEWEST = 'newest',
}

/** Accepts `?types=HOTEL,TOUR` or repeated `?types=HOTEL&types=TOUR` -- same
 * convention as HotelSearchDto's own `amenities` transform. */
function toStringArray({ value }: { value: unknown }): string[] | undefined {
  if (value === undefined) return undefined;
  const raw = Array.isArray(value) ? value : [value];
  return raw.flatMap((entry) => String(entry).split(',')).map((s) => s.trim()).filter(Boolean);
}

export class SearchServicesQueryDto {
  @IsOptional()
  @IsString()
  location?: string;

  /**
   * The Explore page's "Categories" filter -- a checkbox group, so this is
   * an array (any-of), not a single value. Validated as an array of
   * ServiceType strings rather than IsEnum-per-element so an unknown value
   * 400s with a clear message instead of silently matching nothing.
   */
  @IsOptional()
  @Transform(toStringArray)
  @IsArray()
  @IsEnum(ServiceType, { each: true })
  types?: ServiceType[];

  /**
   * startDate/endDate must be supplied together -- enforced in
   * ServicesService.search(), not here, so the 400 can name the actual
   * pairing rule instead of two unrelated per-field errors.
   */
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  /**
   * Price lives per night on InventoryPricing, not on Service itself, so
   * these (and sortBy: price_asc/price_desc) only mean something alongside
   * a date range -- also enforced in ServicesService.search(), for the
   * same reason as above.
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  maxPrice?: number;

  /** Only services whose average review rating is >= this qualify. Rating
   * lives on Review, not Service, so this is resolved via a separate
   * aggregate query -- see ServicesService.getRatingQualifyingServiceIds. */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  minRating?: number;

  @IsOptional()
  @IsEnum(ServiceSortBy)
  sortBy?: ServiceSortBy;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10;
}
