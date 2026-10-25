import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { UnpublishedStockPurchaseItem } from './domain';

export interface UnpublishedStockPIFilter {
  purchaseOrderId?: string;
  productId?: string;
}

export const UNPUBLISHED_STOCK_PI_REPO = 'UNPUBLISHED_STOCK_PI_REPO';

export type IUnpublishedStockPIRepo = IBaseRepo<
  UnpublishedStockPurchaseItem,
  string,
  PageableFilter<UnpublishedStockPIFilter>,
  Filter<UnpublishedStockPIFilter>
>;
