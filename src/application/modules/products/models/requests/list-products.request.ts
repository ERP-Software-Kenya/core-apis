import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { EOrder, Filter } from '../../../../../common';
import { ProductFilter } from '../../domain';

export class ListProductsRequest implements Filter<ProductFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public categoryId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString({ each: true }) @AutoMap(() => Array) public $ids?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;

  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;
}
