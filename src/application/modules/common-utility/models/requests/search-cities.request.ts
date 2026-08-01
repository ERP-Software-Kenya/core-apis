import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import { PageableFilter } from '../../../../../common';
import { CityFilter } from '../../domain';
import { ListCitiesRequest } from './list-cities.request';

export class SearchCitiesRequest extends ListCitiesRequest implements PageableFilter<CityFilter, number> {
  @Type(() => Number) @AutoMap() public $page?: number;
  @Type(() => Number) @AutoMap() public $perPage?: number;
}
