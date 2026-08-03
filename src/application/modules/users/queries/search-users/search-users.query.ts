import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class SearchUsersQuery extends QueryBase {
  @AutoMap() public query: string;
  @AutoMap() public limit?: number;
  @AutoMap() public offset?: number;
}
