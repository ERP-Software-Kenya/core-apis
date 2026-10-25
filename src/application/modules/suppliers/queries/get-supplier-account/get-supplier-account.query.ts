import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetSupplierAccountQuery extends QueryBase {
  @AutoMap() public supplierId: string;
  @AutoMap() public organizationId: string;
}
