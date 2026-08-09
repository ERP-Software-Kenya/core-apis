import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class ListRolesQuery extends QueryBase {
  @AutoMap() public organizationId?: string;
}
