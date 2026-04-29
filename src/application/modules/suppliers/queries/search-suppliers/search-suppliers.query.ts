import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { SupplierFilter } from '../../domain';
import { ListSuppliersQuery } from '../list-suppliers';

export class SearchSuppliersQuery extends ListSuppliersQuery implements PageableFilter<SupplierFilter> {
  @AutoMap() public $page?: number;

  @AutoMap() public $perPage?: number;
}
