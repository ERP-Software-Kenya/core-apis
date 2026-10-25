import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EBranchPriceStatus } from '../../i-product-branch-price.repo';

export class ListBranchProductPricesRequest {
  @ApiPropertyOptional({ description: 'Branch UUID (required for OrgAdmin; ignored for BranchManager)' })
  @IsOptional() @IsUUID() @AutoMap() public branchId?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional() @IsNumber() @Min(1) @Type(() => Number) @AutoMap() public page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional() @IsNumber() @Min(1) @Type(() => Number) @AutoMap() public perPage?: number;

  @ApiPropertyOptional({ description: 'Product name / SKU search term' })
  @IsOptional() @IsString() @AutoMap() public search?: string;

  @ApiPropertyOptional({ enum: ['set', 'not_set'], description: 'Filter by whether branch price is set' })
  @IsOptional() @IsEnum(['set', 'not_set']) @AutoMap() public status?: EBranchPriceStatus;
}
