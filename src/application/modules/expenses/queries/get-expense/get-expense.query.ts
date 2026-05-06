import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetExpenseQuery extends QueryBase {
  @AutoMap() public id: string;
}
