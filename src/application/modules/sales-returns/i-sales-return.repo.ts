import { Filter, IBaseRepo, PageableFilter } from '../../../common';
import { SalesReturn, SalesReturnFilter, SalesReturnItem } from './domain';

export type UpdateSalesReturnRecord = {
  id: string;
  reason?: string;
  notes?: string;
  refundMethod?: string;
  items?: SalesReturnItem[];
  subtotal?: number;
  taxAmount?: number;
  discountAmount?: number;
  totalAmount?: number;
};

export interface ISalesReturnRepo extends IBaseRepo<SalesReturn, string, PageableFilter<SalesReturnFilter>, Filter<SalesReturnFilter>> {
  getWithItemsAsync(id: string): Promise<SalesReturn | null>;
  finalizeAsync(id: string, performedById: string): Promise<SalesReturn>;
  updateDraftAsync(input: UpdateSalesReturnRecord): Promise<SalesReturn>;
}
