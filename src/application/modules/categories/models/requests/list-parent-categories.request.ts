import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { EOrder, Filter } from '../../../../../common';
import { CategoryFilter } from '../..';

export class ListParentCategoriesRequest implements Filter<CategoryFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => { if (value === 'true') return true; if (value === 'false') return false; return undefined; })
  @IsBoolean()
  @AutoMap()
  public isActive?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString({ each: true }) @AutoMap(() => Array) public $ids?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;

  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;
}
