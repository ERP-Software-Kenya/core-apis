import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetPurchaseReturnQuery extends QueryBase {
  @AutoMap() public id: string;
}
