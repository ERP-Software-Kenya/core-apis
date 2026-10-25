import { AutoMap } from '@automapper/classes';
import { EOrder, QueryBase } from '../../../../../common';
import { ESalesReturnStatus } from '../../../../../infrastructure/persistence/entities';

export class SearchSalesReturnsQuery extends QueryBase {
  @AutoMap() public organizationId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public billId?: string;
  @AutoMap() public customerId?: string;
  @AutoMap(() => String) public status?: ESalesReturnStatus;
  @AutoMap() public returnNumber?: string;
  @AutoMap() public $page?: number = 1;
  @AutoMap() public $perPage?: number = 20;
  @AutoMap() public $orderBy?: string = 'createdAt';
  @AutoMap(() => String) public $order?: EOrder = EOrder.Desc;
  public accessibleLocationIds?: string[];
}
