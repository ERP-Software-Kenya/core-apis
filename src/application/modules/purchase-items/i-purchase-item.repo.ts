import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { PurchaseItem } from './domain';

export interface PurchaseItemFilter {
  purchaseOrderId?: string;
}

export const PURCHASE_ITEM_REPO = 'PURCHASE_ITEM_REPO';

export type IPurchaseItemRepo = IBaseRepo<PurchaseItem, string, PageableFilter<PurchaseItemFilter>, Filter<PurchaseItemFilter>>;
