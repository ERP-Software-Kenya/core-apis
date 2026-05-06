import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { BillFilter } from '../../domain';
import { ListBillsQuery } from '../list-bills/list-bills.query';

export class SearchBillsQuery extends ListBillsQuery implements PageableFilter<BillFilter> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
