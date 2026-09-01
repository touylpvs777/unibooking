import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class VideosQueryDto {
  // Grid is a fixed 4x2 on the homepage, so 8 is the default every caller
  // actually wants; the cap just keeps someone from requesting the whole table.
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(24)
  limit: number = 8;
}
