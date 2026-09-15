import { Filter, IBaseRepo, PageableFilter } from '../../../common';
import { PurchaseReturn, PurchaseReturnFilter } from './domain';

export interface IPurchaseReturnRepo extends IBaseRepo<PurchaseReturn, string, PageableFilter<PurchaseReturnFilter>, Filter<PurchaseReturnFilter>> {
  getWithItemsAsync(id: string): Promise<PurchaseReturn | null>;
}
