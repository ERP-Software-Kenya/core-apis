import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PageableFilter } from '../../../../../common';
import { InventoryFilter } from '../../domain';
import { ListInventoryRequest } from './list-inventory.request';

export class SearchInventoryRequest extends ListInventoryRequest implements PageableFilter<InventoryFilter> {
  @ApiPropertyOptional({ default: 1 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(1) @AutoMap() public $page?: number = 1;

  @ApiPropertyOptional({ default: 20 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(1) @AutoMap() public $perPage?: number = 20;
}
