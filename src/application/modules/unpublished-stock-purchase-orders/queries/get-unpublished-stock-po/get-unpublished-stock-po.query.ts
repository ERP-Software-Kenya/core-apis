import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetUnpublishedStockPOQuery extends QueryBase {
  @AutoMap() public id: string;
}
