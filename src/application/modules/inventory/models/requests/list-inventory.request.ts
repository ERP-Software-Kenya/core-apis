import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { EOrder, Filter } from '../../../../../common';
import { InventoryFilter } from '../../domain';

export class ListInventoryRequest implements Filter<InventoryFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public storeId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public productId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString({ each: true }) @AutoMap(() => Array) public $ids?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;

  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;
}
