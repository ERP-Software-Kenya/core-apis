import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class ListBranchProductPricesQuery extends QueryBase {
  @AutoMap() public branchId: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public page: number;
  @AutoMap() public perPage: number;
  @AutoMap() public search?: string;
}
