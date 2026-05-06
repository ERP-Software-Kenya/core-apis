import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetPurchaseItemQuery extends QueryBase {
  @AutoMap() public id: string;
}
