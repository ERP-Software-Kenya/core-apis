import { AutoMap } from "@automapper/classes";
import { PageableFilter } from '../../../../../common';
import { CountryFilter } from '../../domain';
import { ListCountriesQuery } from '../list-countries/list-countries.query';

export class SearchCountriesQuery extends ListCountriesQuery implements PageableFilter<CountryFilter, number> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
