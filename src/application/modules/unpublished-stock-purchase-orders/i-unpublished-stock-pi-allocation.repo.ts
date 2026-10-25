import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { UnpublishedStockPurchaseItemAllocation } from './domain';

export interface UnpublishedStockPIAllocationFilter {
  purchaseOrderId?: string;
  purchaseItemId?: string;
}

export const UNPUBLISHED_STOCK_PI_ALLOCATION_REPO = 'UNPUBLISHED_STOCK_PI_ALLOCATION_REPO';

export type IUnpublishedStockPIAllocationRepo = IBaseRepo<
  UnpublishedStockPurchaseItemAllocation,
  string,
  PageableFilter<UnpublishedStockPIAllocationFilter>,
  Filter<UnpublishedStockPIAllocationFilter>
>;
