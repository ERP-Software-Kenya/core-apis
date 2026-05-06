import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetRoleQuery extends QueryBase {
  @AutoMap() public id: string;
}
