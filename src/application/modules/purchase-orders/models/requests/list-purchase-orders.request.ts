import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { EOrder, Filter } from '../../../../../common';
import { PurchaseOrderFilter } from '../../domain';

export class ListPurchaseOrdersRequest implements Filter<PurchaseOrderFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public storeId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public supplierId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString({ each: true }) @AutoMap(() => Array) public $ids?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;

  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;
}
