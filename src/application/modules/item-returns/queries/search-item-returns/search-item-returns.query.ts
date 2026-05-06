import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { ItemReturnFilter } from '../../domain';
import { ListItemReturnsQuery } from '../list-item-returns/list-item-returns.query';

export class SearchItemReturnsQuery extends ListItemReturnsQuery implements PageableFilter<ItemReturnFilter> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
