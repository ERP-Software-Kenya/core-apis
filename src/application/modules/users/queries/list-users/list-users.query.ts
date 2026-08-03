import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class ListUsersQuery extends QueryBase {
  @AutoMap() public limit?: number;
  @AutoMap() public offset?: number;
  @AutoMap() public organizationId?: string;
}
