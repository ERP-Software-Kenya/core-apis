import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class GetLowStockQuery extends QueryBase {
  @AutoMap() public organizationId: string;
}
