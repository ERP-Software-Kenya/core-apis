import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListBranchProductPricesRequest {
  @ApiPropertyOptional({ description: 'Branch UUID (required for OrgAdmin; ignored for BranchManager)' })
  @IsOptional() @IsUUID() @AutoMap() public branchId?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional() @IsNumber() @Min(1) @Type(() => Number) @AutoMap() public page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional() @IsNumber() @Min(1) @Type(() => Number) @AutoMap() public perPage?: number;

  @ApiPropertyOptional({ description: 'Product name / SKU search term' })
  @IsOptional() @IsString() @AutoMap() public search?: string;
}
