import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EFulfillmentMode } from '../../../../shared/enums/e-fulfillment-mode';

export class SearchOrdersRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public organizationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public status?: string;
  @ApiPropertyOptional({ enum: EFulfillmentMode }) @IsOptional() @IsEnum(EFulfillmentMode) @AutoMap() public fulfillmentMode?: EFulfillmentMode;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public search?: string;
  @ApiPropertyOptional({ description: 'Alias for search (used by list UI)' }) @IsOptional() @IsString() public name?: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() @Min(1) @AutoMap() public $page?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() @Min(1) @AutoMap() public $perPage?: number;
}
