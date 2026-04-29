import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetInventoryQuery extends QueryBase {
  @AutoMap() public id: string;
}
