import { AutoMap } from "@automapper/classes";
import { PageableFilter } from '../../../../../common';
import { CurrencyFilter } from '../../domain';
import { ListCurrenciesQuery } from '../list-currencies/list-currencies.query';

export class SearchCurrenciesQuery extends ListCurrenciesQuery implements PageableFilter<CurrencyFilter, number> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
