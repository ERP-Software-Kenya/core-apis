import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { CategoryFilter } from '../..';
import { ListCategoriesQuery } from '../list-categories';

export class SearchCategoriesQuery extends ListCategoriesQuery implements PageableFilter<CategoryFilter> {
  @AutoMap() public $page?: number;

  @AutoMap() public $perPage?: number;
}
