import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class QuotationFilterDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public $page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public $perPage?: number;

  @ApiPropertyOptional({ description: 'Filter by location UUID' })
  @IsOptional()
  @IsUUID()
  public locationId?: string;

  @ApiPropertyOptional({ description: 'Filter by customer UUID' })
  @IsOptional()
  @IsUUID()
  public customerId?: string;

  @ApiPropertyOptional({ description: 'Filter by status: DRAFT, SENT, CONVERTED, SUPERSEDED, CANCELLED' })
  @IsOptional()
  @IsString()
  public status?: string;

  @ApiPropertyOptional({ description: 'Filter only latest revisions' })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  public isLatest?: boolean;

  @ApiPropertyOptional({ description: 'Search term for quote number, customer name or phone' })
  @IsOptional()
  @IsString()
  public search?: string;
}
