import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import { PageableFilter } from '../../../../../common';
import { CountryFilter } from '../../domain';
import { ListCountriesRequest } from './list-countries.request';

export class SearchCountriesRequest extends ListCountriesRequest implements PageableFilter<CountryFilter, number> {
  @Type(() => Number) @AutoMap() public $page?: number;
  @Type(() => Number) @AutoMap() public $perPage?: number;
}
