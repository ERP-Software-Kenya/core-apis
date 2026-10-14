import { AutoMap } from '@automapper/classes';
import { EOrder, QueryBase } from '../../../../../common';
import { EPurchaseReturnStatus } from '../../../../../infrastructure/persistence/entities';

export class SearchPurchaseReturnsQuery extends QueryBase {
  @AutoMap() public organizationId?: string;
  public branchId?: string;
  @AutoMap() public purchaseOrderId?: string;
  @AutoMap() public supplierId?: string;
  @AutoMap(() => String) public status?: EPurchaseReturnStatus;
  @AutoMap() public returnNumber?: string;
  @AutoMap() public $page?: number = 1;
  @AutoMap() public $perPage?: number = 20;
  @AutoMap() public $orderBy?: string = 'createdAt';
  @AutoMap(() => String) public $order?: EOrder = EOrder.Desc;
}
