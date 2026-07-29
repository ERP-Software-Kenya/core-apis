import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { EOrder, Filter } from '../../../../../common';
import { CategoryFilter } from '../..';

export class ListCategoriesRequest implements Filter<CategoryFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isActive?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString({ each: true }) @AutoMap(() => Array) public $ids?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;

  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;
}
