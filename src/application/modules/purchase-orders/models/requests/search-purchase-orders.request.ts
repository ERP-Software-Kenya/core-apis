import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PageableFilter } from '../../../../../common';
import { PurchaseOrderFilter } from '../../domain';
import { ListPurchaseOrdersRequest } from './list-purchase-orders.request';

export class SearchPurchaseOrdersRequest extends ListPurchaseOrdersRequest implements PageableFilter<PurchaseOrderFilter> {
  @ApiPropertyOptional({ default: 1 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(1) @AutoMap() public $page?: number = 1;

  @ApiPropertyOptional({ default: 20 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(1) @AutoMap() public $perPage?: number = 20;
}
