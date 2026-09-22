import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class ListTaxesQuery extends QueryBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public isActive?: boolean;
}
