import { Filter, IBaseRepo, PageableFilter } from '../../../common';
import { ESalesReturnStatus } from '../../../infrastructure/persistence/entities';
import { SalesReturnItem } from './domain';

export interface SalesReturnItemFilter {
  salesReturnId?: string;
  billItemId?: string;
}

export interface ISalesReturnItemRepo extends IBaseRepo<SalesReturnItem, string, PageableFilter<SalesReturnItemFilter>, Filter<SalesReturnItemFilter>> {
  sumFinalizedQuantityByBillItemAsync(billItemId: string, excludeSalesReturnId?: string): Promise<number>;
  sumFinalizedQuantitiesByBillItemsAsync(billItemIds: string[], excludeSalesReturnId?: string): Promise<Map<string, number>>;
  allWithReturnStatusAsync(salesReturnId: string, status?: ESalesReturnStatus): Promise<SalesReturnItem[]>;
}
