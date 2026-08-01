import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { StoreFilter } from '../../domain';

export class ListStoresQuery extends QueryBase implements Filter<StoreFilter> {
  @AutoMap() public name?: string;

  @AutoMap() public organizationId?: string;

  @AutoMap() public isActive?: boolean;

  @AutoMap(() => Array) public $ids?: string[];

  @AutoMap() public $orderBy?: string;

  @AutoMap(() => String) public $order?: EOrder;
}
