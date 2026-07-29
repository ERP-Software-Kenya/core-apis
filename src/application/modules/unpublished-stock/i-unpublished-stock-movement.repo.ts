import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { EntityManager } from 'typeorm';
import { UnpublishedStockMovement } from './domain';
import { UnpublishedStockMovementInput } from 'src/application/shared/interfaces/i-stock-operation.interface';

export interface UnpublishedStockMovementFilter {
  unpublishedStockId?: string;
  locationId?: string;
  productId?: string;
}

export const UNPUBLISHED_STOCK_MOVEMENT_REPO = 'UNPUBLISHED_STOCK_MOVEMENT_REPO';

export interface IUnpublishedStockMovementRepo extends IBaseRepo<UnpublishedStockMovement, string, PageableFilter<UnpublishedStockMovementFilter>, Filter<UnpublishedStockMovementFilter>> {
  createWithManagerAsync(input: UnpublishedStockMovementInput, manager: EntityManager): Promise<UnpublishedStockMovement>;
  listByUnpublishedStockAsync(unpublishedStockId: string): Promise<UnpublishedStockMovement[]>;
}
