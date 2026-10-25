import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class UpsertBranchProductPriceCommand extends CommandBase {
  @AutoMap() public branchId: string;
  @AutoMap() public productId: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public costPrice?: number | null;
  @AutoMap() public retailPrice?: number | null;
  @AutoMap() public loyaltyPrice?: number | null;
  @AutoMap() public wholesalePrice?: number | null;
  @AutoMap() public transferPrice?: number | null;
}
