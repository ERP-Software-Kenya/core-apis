import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SupplierAccountPurchaseOrderResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public poNumber: string;
  @ApiProperty() @AutoMap(() => String) public status: string;
  @ApiProperty() @AutoMap() public totalAmount: number;
  @ApiProperty() @AutoMap() public amountPaid: number;
  @ApiProperty() @AutoMap() public outstanding: number;
  @ApiProperty() @AutoMap() public paymentStatus: string;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
}

export class SupplierAccountResponse {
  @ApiProperty() @AutoMap() public supplierId: string;
  @ApiProperty() @AutoMap() public supplierName: string;
  @ApiPropertyOptional() @AutoMap() public supplierPhone?: string;
  @ApiProperty() @AutoMap() public totalInvoiced: number;
  @ApiProperty() @AutoMap() public totalPaid: number;
  @ApiProperty() @AutoMap() public totalOutstanding: number;
  @ApiProperty({ type: [SupplierAccountPurchaseOrderResponse] })
  @AutoMap(() => [SupplierAccountPurchaseOrderResponse])
  public purchaseOrders: SupplierAccountPurchaseOrderResponse[];
}
