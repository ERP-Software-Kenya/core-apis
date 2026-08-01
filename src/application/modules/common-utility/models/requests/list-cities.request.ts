import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import { EOrder, Filter } from '../../../../../common';
import { CityFilter } from '../../domain';

export class ListCitiesRequest implements Filter<CityFilter, number> {
  @AutoMap() public name?: string;
  @Type(() => Number) @AutoMap() public stateId?: number;
  @Type(() => Number) @AutoMap(() => Array) public $ids?: number[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
