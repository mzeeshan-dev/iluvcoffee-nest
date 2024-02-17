// import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  // @Type(() => Number) // 👉 defined at the global level or can be used for the single like it is here
  // @IsInt() // 👉 can be used
  @IsPositive()
  @IsOptional()
  limit: number;

  // @Type(() => Number)
  // @IsInt()
  @IsPositive()
  @IsOptional()
  offset: number;
}
