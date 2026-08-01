import { AutoMap } from "@automapper/classes";
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { CurrencyFilter } from '../../domain';

export class ListCurrenciesQuery extends QueryBase implements Filter<CurrencyFilter, number> {
  @AutoMap() public name?: string;
  @AutoMap(() => Array) public $ids?: number[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
