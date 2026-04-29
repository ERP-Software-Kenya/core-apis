import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { InventoryFilter } from '../../domain';
import { ListInventoryQuery } from '../list-inventory';

export class SearchInventoryQuery extends ListInventoryQuery implements PageableFilter<InventoryFilter> {
  @AutoMap() public $page?: number;

  @AutoMap() public $perPage?: number;
}
