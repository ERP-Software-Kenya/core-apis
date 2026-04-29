import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { PurchaseOrderFilter } from '../../domain';
import { ListPurchaseOrdersQuery } from '../list-purchase-orders';

export class SearchPurchaseOrdersQuery extends ListPurchaseOrdersQuery implements PageableFilter<PurchaseOrderFilter> {
  @AutoMap() public $page?: number;

  @AutoMap() public $perPage?: number;
}
