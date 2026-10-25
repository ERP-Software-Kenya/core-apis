import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class ListUnpublishedStockPOPaymentsQuery extends QueryBase {
  @AutoMap() public purchaseOrderId: string;
  @AutoMap() public organizationId: string;
}
