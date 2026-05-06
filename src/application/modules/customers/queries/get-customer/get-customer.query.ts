import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetCustomerQuery extends QueryBase {
  @AutoMap() public id: string;
}
