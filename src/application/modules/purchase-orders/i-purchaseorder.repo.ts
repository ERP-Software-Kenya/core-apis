import { IBaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { PurchaseOrder } from './domain';

export interface PurchaseOrderFilter {
  search?: string;
  isActive?: boolean;
}

export const PURCHASE_ORDER_REPO = 'PURCHASE_ORDER_REPO';

export interface IPurchaseOrderRepo extends IBaseRepo<PurchaseOrder, string, PageableFilter<PurchaseOrderFilter>, Filter<PurchaseOrderFilter>> {
}
