import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { ProductFilter } from '../../domain';
import { ListProductsQuery } from '../list-products';

export class SearchProductsQuery extends ListProductsQuery implements PageableFilter<ProductFilter> {
  @AutoMap() public $page?: number;

  @AutoMap() public $perPage?: number;
}
