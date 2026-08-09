import { AutoMap } from "@automapper/classes";
import { PageableFilter } from '../../../../../common';
import { StateFilter } from '../../domain';
import { ListStatesQuery } from '../list-states/list-states.query';

export class SearchStatesQuery extends ListStatesQuery implements PageableFilter<StateFilter, number> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
