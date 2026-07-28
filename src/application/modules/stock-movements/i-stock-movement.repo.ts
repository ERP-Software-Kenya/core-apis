import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { EntityManager } from 'typeorm';
import { StockMovement } from './domain';
import { StockMovementInput } from '../../../application/shared/interfaces/i-stock-operation.interface';

export interface StockMovementFilter {
  inventoryId?: string;
  locationId?: string;
  productId?: string;
  isUnpublishedEntry?: boolean;
}

export const STOCK_MOVEMENT_REPO = 'STOCK_MOVEMENT_REPO';

export interface IStockMovementRepo extends IBaseRepo<StockMovement, string, PageableFilter<StockMovementFilter>, Filter<StockMovementFilter>> {
  createWithManagerAsync(input: StockMovementInput, manager: EntityManager): Promise<StockMovement>;
  listByInventoryAsync(inventoryId: string): Promise<StockMovement[]>;
}
