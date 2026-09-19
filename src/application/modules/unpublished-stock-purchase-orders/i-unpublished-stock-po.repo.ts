import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { UnpublishedStockPurchaseOrder, UnpublishedStockPOFilter } from './domain';

export const UNPUBLISHED_STOCK_PO_REPO = 'UNPUBLISHED_STOCK_PO_REPO';

export type IUnpublishedStockPORepo = IBaseRepo<
  UnpublishedStockPurchaseOrder,
  string,
  PageableFilter<UnpublishedStockPOFilter>,
  Filter<UnpublishedStockPOFilter>
>;
