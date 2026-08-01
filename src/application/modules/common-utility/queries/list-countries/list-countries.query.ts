import { AutoMap } from "@automapper/classes";
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { CountryFilter } from '../../domain';

export class ListCountriesQuery extends QueryBase implements Filter<CountryFilter, number> {
  @AutoMap() public name?: string;
  @AutoMap(() => Array) public $ids?: number[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
