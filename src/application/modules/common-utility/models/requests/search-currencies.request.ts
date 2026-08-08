import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import { PageableFilter } from '../../../../../common';
import { CurrencyFilter } from '../../domain';
import { ListCurrenciesRequest } from './list-currencies.request';

export class SearchCurrenciesRequest extends ListCurrenciesRequest implements PageableFilter<CurrencyFilter, number> {
  @Type(() => Number) @AutoMap() public $page?: number;
  @Type(() => Number) @AutoMap() public $perPage?: number;
}
