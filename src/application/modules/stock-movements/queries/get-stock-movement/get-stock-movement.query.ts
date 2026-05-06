import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetStockMovementQuery extends QueryBase {
  @AutoMap() public id: string;
}
