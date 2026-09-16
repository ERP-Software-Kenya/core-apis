import { Filter, IBaseRepo, PageableFilter } from '../../../common';
import { SalesReturn, SalesReturnFilter } from './domain';

export interface ISalesReturnRepo extends IBaseRepo<SalesReturn, string, PageableFilter<SalesReturnFilter>, Filter<SalesReturnFilter>> {
  getWithItemsAsync(id: string): Promise<SalesReturn | null>;
}
