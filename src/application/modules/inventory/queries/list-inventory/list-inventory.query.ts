import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { InventoryFilter } from '../../domain';

export class ListInventoryQuery extends QueryBase implements Filter<InventoryFilter> {
  @AutoMap() public storeId?: string;

  @AutoMap() public productId?: string;

  @AutoMap(() => Array) public $ids?: string[];

  @AutoMap() public $orderBy?: string;

  @AutoMap(() => String) public $order?: EOrder;
}
