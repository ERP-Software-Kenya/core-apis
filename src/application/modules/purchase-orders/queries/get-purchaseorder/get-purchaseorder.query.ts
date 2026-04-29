import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetPurchaseOrderQuery extends QueryBase {
  @AutoMap() public id: string;
}
