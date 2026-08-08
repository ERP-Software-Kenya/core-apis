import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class GetProductLogQuery extends QueryBase {
  @AutoMap() public id: string;
}
