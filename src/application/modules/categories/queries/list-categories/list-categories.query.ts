import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { CategoryFilter } from '../..';

export class ListCategoriesQuery extends QueryBase implements Filter<CategoryFilter> {
  @AutoMap() public name?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap() public parentId?: string | null;
  @AutoMap() public organizationId?: string;
  @AutoMap() public hasParent?: boolean;

  @AutoMap(() => Array) public $ids?: string[];

  @AutoMap() public $orderBy?: string;

  @AutoMap(() => String) public $order?: EOrder;
}
