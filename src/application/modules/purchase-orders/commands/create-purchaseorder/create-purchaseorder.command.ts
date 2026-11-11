import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreatePurchaseOrderItemInput {
  public productId: string;
  public productUnitId?: string;
  public quantityOrdered: number;
  public unitCost: number;
  public selectedUnitId?: string;
  public selectedUnitNameSnapshot?: string;
  public selectedUnitSymbolSnapshot?: string;
  public enteredQuantity?: string;
  public conversionFactorSnapshot?: string;
  public baseUnitId?: string;
  public selectedUnitCost?: number;
}

export class CreatePurchaseOrderCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public branchId?: string;
  @AutoMap() public supplierId: string;
  @AutoMap() public createdById?: string;
  @AutoMap() public expectedAt?: string;
  @AutoMap() public notes?: string;
  public items: CreatePurchaseOrderItemInput[];
}
