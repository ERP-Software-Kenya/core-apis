import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { BranchFilter } from '../../domain';

export class ListBranchesQuery extends QueryBase implements Filter<BranchFilter> {
  @AutoMap() public organizationId?: string;
  @AutoMap() public name?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap(() => Array) public $ids?: string[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
