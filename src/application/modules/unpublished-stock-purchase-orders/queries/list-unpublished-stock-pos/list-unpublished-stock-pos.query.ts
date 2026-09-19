import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { UnpublishedStockPOFilter } from '../../domain';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

export class ListUnpublishedStockPOsQuery extends QueryBase implements Filter<UnpublishedStockPOFilter> {
  @AutoMap() public organizationId?: string;
  @AutoMap() public supplierId?: string;
  @AutoMap(() => String) public status?: EPurchaseOrderStatus;

  @AutoMap(() => Array) public $ids?: string[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
