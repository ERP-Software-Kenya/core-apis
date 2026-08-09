import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class GetTripQuery extends QueryBase {
  @AutoMap() public id: string;
}
