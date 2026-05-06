import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { BillFilter } from '../../domain';

export class ListBillsQuery extends QueryBase implements Filter<BillFilter> {
  @AutoMap() public supplierId?: string;
  @AutoMap() public storeId?: string;
  @AutoMap() public status?: string;

  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
