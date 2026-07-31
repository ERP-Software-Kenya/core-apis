import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { BillFilter } from '../../domain';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';

export class ListBillsQuery extends QueryBase implements Filter<BillFilter> {
  @AutoMap() public organizationId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public customerId?: string;
  @AutoMap(() => String) public status?: EBillStatus;
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
