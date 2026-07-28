import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class GetLocationQuery extends QueryBase {
  @AutoMap() public id: string;
}
