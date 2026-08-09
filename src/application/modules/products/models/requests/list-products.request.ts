import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { EOrder, Filter } from '../../../../../common';
import { ProductFilter } from '../../domain';

export class ListProductsRequest implements Filter<ProductFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public categoryId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString({ each: true }) @AutoMap(() => Array) public $ids?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;

  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;

  @ApiPropertyOptional({ description: 'Filter by active status. Pass true or false as a string.' })
  @IsOptional()
  @Transform(({ value }) => { if (value === 'true') return true; if (value === 'false') return false; return undefined; })
  @IsBoolean()
  @AutoMap()
  public isActive?: boolean;
}
