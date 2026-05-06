import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetStockTransferQuery extends QueryBase {
  @AutoMap() public id: string;
}
