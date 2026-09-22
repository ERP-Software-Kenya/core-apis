import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class GetBranchProductPriceQuery extends QueryBase {
  @AutoMap() public branchId: string;
  @AutoMap() public productId: string;
}
