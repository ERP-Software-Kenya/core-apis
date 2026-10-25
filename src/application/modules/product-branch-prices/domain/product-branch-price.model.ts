import { AutoMap } from '@automapper/classes';

export class ProductBranchPrice {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public branchId: string;
  @AutoMap() public productId: string;
  @AutoMap() public productName: string;
  @AutoMap() public sku?: string;
  @AutoMap() public costPrice: number | null;
  @AutoMap() public retailPrice: number | null;
  @AutoMap() public loyaltyPrice: number | null;
  @AutoMap() public wholesalePrice: number | null;
  @AutoMap() public transferPrice: number | null;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
