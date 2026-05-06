import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { PaymentTransactionFilter } from '../../domain';

export class ListPaymentTransactionsQuery extends QueryBase implements Filter<PaymentTransactionFilter> {
  @AutoMap() public orgId?: string;
  @AutoMap() public referenceId?: string;
  @AutoMap() public status?: string;

  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
