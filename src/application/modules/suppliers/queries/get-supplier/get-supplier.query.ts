import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetSupplierQuery extends QueryBase {
  @AutoMap() public id: string;
}
