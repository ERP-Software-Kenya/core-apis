import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EFulfillmentMode } from '../../../../shared/enums/e-fulfillment-mode';

export class SearchOrdersRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public organizationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public status?: string;
  @ApiPropertyOptional({ enum: EFulfillmentMode }) @IsOptional() @IsEnum(EFulfillmentMode) @AutoMap() public fulfillmentMode?: EFulfillmentMode;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public search?: string;
  @ApiPropertyOptional({ description: 'Alias for search (used by list UI)' }) @IsOptional() @IsString() public name?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public $page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public $perPage?: number;
}
