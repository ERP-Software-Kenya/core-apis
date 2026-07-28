import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EOrder, Filter } from 'src/common';
import { InventoryFilter } from '../../domain';

export class ListInventoryRequest implements Filter<InventoryFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public organizationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public productId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString({ each: true }) @AutoMap(() => Array) public $ids?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;
  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;
}
