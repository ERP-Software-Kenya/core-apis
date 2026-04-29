import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetProductQuery extends QueryBase {
  @AutoMap() public id: string;
}
