import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetUserRolesQuery extends QueryBase {
  @AutoMap() public clerkUserId: string;
}
