import { AutoMap } from '@automapper/classes';
import { EMovementType } from 'src/infrastructure/persistence/entities';

export interface IStockOperation {
  inventoryId: string;
  organizationId: string;
  productId: string;
  locationId: string;
  quantity: number;
  performedById?: string;
  unitCost?: number;
  referenceId?: string;
  referenceType?: string;
  notes?: string;
}

export interface IPublishStockOperation {
  inventoryId: string;
  organizationId: string;
  productId: string;
  locationId: string;
  quantity: number;
  performedById?: string;
  notes?: string;
}

export interface IAdjustStockOperation {
  inventoryId: string;
  organizationId: string;
  productId: string;
  locationId: string;
  absoluteQuantity: number;
  performedById?: string;
  unitCost?: number;
  notes?: string;
}

export interface ITransferStockOperation {
  fromInventoryId: string;
  toInventoryId: string;
  organizationId: string;
  productId: string;
  fromLocationId: string;
  toLocationId: string;
  quantity: number;
  performedById?: string;
  referenceId?: string;
  notes?: string;
}

export class StockMovementInput {
  @AutoMap() public inventoryId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public performedById?: string;
  @AutoMap() public referenceId?: string;
  @AutoMap() public referenceType?: string;
  @AutoMap(() => String) public movementType: EMovementType;
  @AutoMap() public quantity: number;
  @AutoMap() public quantityBefore: number;
  @AutoMap() public quantityAfter: number;
  @AutoMap() public unitCost?: number;
  @AutoMap() public isUnpublishedEntry: boolean;
  @AutoMap() public notes?: string;
}
