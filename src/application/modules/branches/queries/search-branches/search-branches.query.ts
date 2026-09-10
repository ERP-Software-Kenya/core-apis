import { AutoMap } from '@automapper/classes';
import { ListBranchesQuery } from '../list-branches/list-branches.query';

export class SearchBranchesQuery extends ListBranchesQuery {
  @AutoMap() public $page?: number = 1;
  @AutoMap() public $perPage?: number = 20;
}
