import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetUserQuery extends QueryBase {
  @AutoMap() public id: string;
}
