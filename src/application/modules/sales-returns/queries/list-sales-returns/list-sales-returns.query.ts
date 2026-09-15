import { AutoMap } from '@automapper/classes';
import { EOrder } from '../../../../../common';
import { ESalesReturnStatus } from '../../../../../infrastructure/persistence/entities';

export class ListSalesReturnsQuery {
  @AutoMap() public organizationId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public billId?: string;
  @AutoMap() public customerId?: string;
  @AutoMap(() => String) public status?: ESalesReturnStatus;
  @AutoMap() public returnNumber?: string;
  @AutoMap() public $orderBy?: string = 'createdAt';
  @AutoMap(() => String) public $order?: EOrder = EOrder.Desc;
  public accessibleLocationIds?: string[];
}
