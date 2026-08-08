import { AutoMap } from '@automapper/classes';

export class PurchaseItem {
  @AutoMap() public id: string;
  @AutoMap() public purchaseOrderId: string;
  @AutoMap() public productId: string;
  @AutoMap() public quantityOrdered: number;
  @AutoMap() public quantityReceived: number;
  @AutoMap() public unitCost: number;
  @AutoMap() public totalCost: number;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
