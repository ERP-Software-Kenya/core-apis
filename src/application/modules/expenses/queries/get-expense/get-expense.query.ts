import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';
import { ERole } from '../../../../../infrastructure/persistence/entities';

export class GetExpenseQuery extends QueryBase {
  @AutoMap() public id: string;
  @AutoMap() public callerUserId?: string;
  public callerRoles?: ERole[];
}
