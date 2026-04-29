import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { PurchaseOrderFilter } from '../../domain';

export class ListPurchaseOrdersQuery extends QueryBase implements Filter<PurchaseOrderFilter> {
  @AutoMap() public storeId?: string;

  @AutoMap() public supplierId?: string;

  @AutoMap(() => Array) public $ids?: string[];

  @AutoMap() public $orderBy?: string;

  @AutoMap(() => String) public $order?: EOrder;
}
