import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { OrganizationFilter } from '../../domain';

export class ListOrganizationsQuery extends QueryBase implements Filter<OrganizationFilter> {
  @AutoMap() public name?: string;

  @AutoMap(() => Array) public $ids?: string[];

  @AutoMap() public $orderBy?: string;

  @AutoMap(() => String) public $order?: EOrder;
}
