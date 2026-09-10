import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from 'src/common';
import { InventoryFilter } from '../../domain';

export class ListInventoryQuery extends QueryBase implements Filter<InventoryFilter> {
  @AutoMap() public organizationId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap(() => [String]) public accessibleLocationIds?: string[];
  @AutoMap() public productId?: string;
  @AutoMap(() => Array) public $ids?: string[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
