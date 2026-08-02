import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class ListPurchaseItemsQuery extends QueryBase {
  @AutoMap() public purchaseOrderId: string;
}
