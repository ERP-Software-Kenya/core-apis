import { AutoMap } from '@automapper/classes';

export class PurchaseOrderPayment {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public purchaseOrderId: string;
  @AutoMap() public supplierId: string;
  @AutoMap() public amount: number;
  @AutoMap() public paymentMethod: string;
  @AutoMap(() => Date) public paidAt: Date;
  @AutoMap() public note?: string;
  @AutoMap() public performedById?: string;
  @AutoMap(() => Date) public createdAt: Date;
}
