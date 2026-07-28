import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class GetValuationQuery extends QueryBase {
  @AutoMap() public organizationId: string;
}
