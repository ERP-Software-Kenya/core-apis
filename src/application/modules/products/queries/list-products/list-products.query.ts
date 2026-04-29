import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { ProductFilter } from '../../domain';

export class ListProductsQuery extends QueryBase implements Filter<ProductFilter> {
  @AutoMap() public name?: string;

  @AutoMap() public categoryId?: string;

  @AutoMap(() => Array) public $ids?: string[];

  @AutoMap() public $orderBy?: string;

  @AutoMap(() => String) public $order?: EOrder;
}
