import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { OrganizationFilter } from '../../domain';
import { ListOrganizationsQuery } from '../list-organizations';

export class SearchOrganizationsQuery extends ListOrganizationsQuery implements PageableFilter<OrganizationFilter> {
  @AutoMap() public $page?: number;

  @AutoMap() public $perPage?: number;
}
