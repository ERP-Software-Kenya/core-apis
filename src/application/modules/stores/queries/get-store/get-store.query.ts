import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetStoreQuery extends QueryBase {
  @AutoMap() public id: string;
}
