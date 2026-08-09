import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import { EOrder, Filter } from '../../../../../common';
import { CountryFilter } from '../../domain';

export class ListCountriesRequest implements Filter<CountryFilter, number> {
  @AutoMap() public name?: string;
  @Type(() => Number) @AutoMap(() => Array) public $ids?: number[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
