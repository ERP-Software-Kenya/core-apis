import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import { PageableFilter } from '../../../../../common';
import { StateFilter } from '../../domain';
import { ListStatesRequest } from './list-states.request';

export class SearchStatesRequest extends ListStatesRequest implements PageableFilter<StateFilter, number> {
  @Type(() => Number) @AutoMap() public $page?: number;
  @Type(() => Number) @AutoMap() public $perPage?: number;
}
