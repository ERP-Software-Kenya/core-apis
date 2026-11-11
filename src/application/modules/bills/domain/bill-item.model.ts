import { AutoMap } from '@automapper/classes';

export class BillItem {
  @AutoMap() public id: string;
  @AutoMap() public billId: string;
  @AutoMap() public productId: string;
  @AutoMap() public variantId?: string;
  @AutoMap() public quantity: number;
  @AutoMap() public productUnitId?: string;
  @AutoMap() public selectedUnitId?: string;
  @AutoMap() public selectedUnitNameSnapshot?: string;
  @AutoMap() public selectedUnitSymbolSnapshot?: string;
  @AutoMap() public enteredQuantity?: string;
  @AutoMap() public conversionFactorSnapshot?: string;
  @AutoMap() public baseUnitId?: string;
  @AutoMap() public baseUnitPrice?: number;
  @AutoMap() public unitPrice: number;
  @AutoMap() public unitCostSnapshot?: number;
  @AutoMap() public taxRate: number;
  @AutoMap() public taxAmount: number;
  @AutoMap() public discountAmount: number;
  @AutoMap() public lineTotal: number;
  /** Override location for stock deduction — falls back to bill.locationId when absent. */
  @AutoMap() public locationId?: string;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
