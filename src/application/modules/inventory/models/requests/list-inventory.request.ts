import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { EOrder, Filter } from 'src/common';
import { InventoryFilter } from '../../domain';

export class ListInventoryRequest implements Filter<InventoryFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public productId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID(4, { each: true }) @AutoMap(() => Array) public $ids?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;
  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;
}
