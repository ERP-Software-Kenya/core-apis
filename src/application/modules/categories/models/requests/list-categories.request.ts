import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { EOrder, Filter } from '../../../../../common';
import { CategoryFilter } from '../..';

export class ListCategoriesRequest implements Filter<CategoryFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => { if (value === 'true') return true; if (value === 'false') return false; return undefined; })
  @IsBoolean()
  @AutoMap()
  public isActive?: boolean;
  @ApiPropertyOptional({ description: 'Filter by parent category UUID — returns only direct children of that parent' })
  @IsOptional() @IsUUID() @AutoMap() public parentId?: string;

  @ApiPropertyOptional({ description: 'true = sub-categories only (has parent), false = root categories only (no parent)' })
  @IsOptional()
  @Transform(({ value }) => { if (value === 'true') return true; if (value === 'false') return false; return undefined; })
  @IsBoolean()
  @AutoMap()
  public hasParent?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString({ each: true }) @AutoMap(() => Array) public $ids?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;

  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;
}
