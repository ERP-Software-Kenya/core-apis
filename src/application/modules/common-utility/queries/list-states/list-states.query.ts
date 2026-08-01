import { AutoMap } from "@automapper/classes";
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { StateFilter } from '../../domain';

export class ListStatesQuery extends QueryBase implements Filter<StateFilter, number> {
  @AutoMap() public name?: string;
  @AutoMap() public countryId?: number;
  @AutoMap(() => Array) public $ids?: number[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
