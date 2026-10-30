import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';
import { ERole } from '../../../../../infrastructure';

export class ListMembersQuery extends QueryBase {
  @AutoMap() public organizationId?: string;
  public currentOrganizationId?: string;
  public currentRoles: ERole[];
}
