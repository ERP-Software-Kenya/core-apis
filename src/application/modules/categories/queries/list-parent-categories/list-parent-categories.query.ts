import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { CategoryFilter } from '../..';

export class ListParentCategoriesQuery extends QueryBase implements Filter<CategoryFilter> {
  @AutoMap() public name?: string;
  @AutoMap() public isActive?: boolean;

  @AutoMap(() => Array) public $ids?: string[];

  @AutoMap() public $orderBy?: string;

  @AutoMap(() => String) public $order?: EOrder;
}
