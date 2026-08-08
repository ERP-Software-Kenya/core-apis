import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { ItemReturnFilter } from '../../domain';

export class ListItemReturnsQuery extends QueryBase implements Filter<ItemReturnFilter> {
  @AutoMap() public locationId?: string;
  @AutoMap() public orderId?: string;
  @AutoMap() public status?: string;

  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
