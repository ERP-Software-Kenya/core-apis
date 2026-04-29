import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PageableFilter } from '../../../../../common';
import { OrganizationFilter } from '../../domain';
import { ListOrganizationsRequest } from './list-organizations.request';

export class SearchOrganizationsRequest extends ListOrganizationsRequest implements PageableFilter<OrganizationFilter> {
  @ApiPropertyOptional({ default: 1 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(1) @AutoMap() public $page?: number = 1;

  @ApiPropertyOptional({ default: 20 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(1) @AutoMap() public $perPage?: number = 20;
}
