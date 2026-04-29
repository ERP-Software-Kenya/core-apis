import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { StoreFilter } from '../../domain';
import { ListStoresQuery } from '../list-stores';

export class SearchStoresQuery extends ListStoresQuery implements PageableFilter<StoreFilter> {
  @AutoMap() public $page?: number;

  @AutoMap() public $perPage?: number;
}
