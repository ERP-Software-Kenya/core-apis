import { AutoMap } from "@automapper/classes";
import { PageableFilter } from '../../../../../common';
import { CityFilter } from '../../domain';
import { ListCitiesQuery } from '../list-cities/list-cities.query';

export class SearchCitiesQuery extends ListCitiesQuery implements PageableFilter<CityFilter, number> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
