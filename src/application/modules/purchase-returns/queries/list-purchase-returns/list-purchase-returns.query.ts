import { AutoMap } from '@automapper/classes';
import { EOrder } from '../../../../../common';
import { EPurchaseReturnStatus } from '../../../../../infrastructure/persistence/entities';

export class ListPurchaseReturnsQuery {
  @AutoMap() public organizationId?: string;
  @AutoMap() public purchaseOrderId?: string;
  @AutoMap() public supplierId?: string;
  @AutoMap(() => String) public status?: EPurchaseReturnStatus;
  @AutoMap() public returnNumber?: string;
  @AutoMap() public $orderBy?: string = 'createdAt';
  @AutoMap(() => String) public $order?: EOrder = EOrder.Desc;
}
