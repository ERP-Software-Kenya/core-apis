import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';
import { EBranchPriceStatus } from '../../i-product-branch-price.repo';

export class ListBranchProductPricesQuery extends QueryBase {
  @AutoMap() public branchId: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public page: number;
  @AutoMap() public perPage: number;
  @AutoMap() public search?: string;
  @AutoMap() public status?: EBranchPriceStatus;
}
