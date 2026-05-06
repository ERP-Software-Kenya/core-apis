import { AutoMap } from '@automapper/classes';

export class PurchaseItem {
  @AutoMap() public id: string;
  @AutoMap() public purchaseOrderId: string;
  @AutoMap() public productId: string;
  @AutoMap() public quantity: number;
  @AutoMap() public unitPrice: number;
  @AutoMap() public totalPrice: number;
  @AutoMap(() => Date) public createdAt?: Date;
}
