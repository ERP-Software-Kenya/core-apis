import { AutoMap } from '@automapper/classes';

export class SupplierAccountPurchaseOrder {
  @AutoMap() public id: string;
  @AutoMap() public poNumber: string;
  @AutoMap(() => String) public status: string;
  @AutoMap() public totalAmount: number;
  @AutoMap() public amountPaid: number;
  @AutoMap() public outstanding: number;
  @AutoMap() public paymentStatus: string;
  @AutoMap(() => Date) public createdAt: Date;
}

export class SupplierAccount {
  @AutoMap() public supplierId: string;
  @AutoMap() public supplierName: string;
  @AutoMap() public supplierPhone?: string;
  @AutoMap() public totalInvoiced: number;
  @AutoMap() public totalPaid: number;
  @AutoMap() public totalOutstanding: number;
  @AutoMap(() => [SupplierAccountPurchaseOrder]) public purchaseOrders: SupplierAccountPurchaseOrder[];
}
