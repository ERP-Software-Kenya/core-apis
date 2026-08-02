import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { SupplierFilter } from '../../domain';

export class ListSuppliersQuery extends QueryBase implements Filter<SupplierFilter> {
  @AutoMap() public name?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap() public organizationId?: string;

  @AutoMap(() => Array) public $ids?: string[];

  @AutoMap() public $orderBy?: string;

  @AutoMap(() => String) public $order?: EOrder;
}
