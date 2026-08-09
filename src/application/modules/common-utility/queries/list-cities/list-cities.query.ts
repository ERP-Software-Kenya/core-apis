import { AutoMap } from "@automapper/classes";
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { CityFilter } from '../../domain';

export class ListCitiesQuery extends QueryBase implements Filter<CityFilter, number> {
  @AutoMap() public name?: string;
  @AutoMap() public stateId?: number;
  @AutoMap(() => Array) public $ids?: number[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
