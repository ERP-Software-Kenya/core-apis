import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { EBillStatus, EPaymentMethod } from '../../../../../infrastructure/persistence/entities';
import { BillFilter } from '../../domain';

export class ListBillsQuery extends QueryBase implements Filter<BillFilter> {
  @AutoMap() public organizationId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap(() => Array) public accessibleLocationIds?: string[];
  @AutoMap() public customerId?: string;
  @AutoMap() public createdById?: string;
  @AutoMap() public billNumber?: string;
  @AutoMap(() => String) public status?: EBillStatus;
  @AutoMap(() => String) public paymentMethod?: EPaymentMethod;

  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
