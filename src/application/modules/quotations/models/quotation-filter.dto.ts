import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from 'class-validator';
import { EQuotationStatus } from '../../../shared/enums';

export class QuotationFilterDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
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
  @IsEnum(EQuotationStatus)
  public status?: EQuotationStatus;

  @ApiPropertyOptional({ description: 'Filter only latest revisions' })
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  public isLatest?: boolean;

  @ApiPropertyOptional({ description: 'Search term for quote number, customer name or phone' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  public search?: string;
}
