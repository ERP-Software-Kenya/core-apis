import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PageableFilter } from '../../../../../common';
import { BranchFilter } from '../../domain';
import { ListBranchesRequest } from './list-branches.request';

export class SearchBranchesRequest extends ListBranchesRequest implements PageableFilter<BranchFilter> {
  @ApiPropertyOptional({ default: 1 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(1) @AutoMap() public $page?: number = 1;

  @ApiPropertyOptional({ default: 20 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(1) @AutoMap() public $perPage?: number = 20;
}
