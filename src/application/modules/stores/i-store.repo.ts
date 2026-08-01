import { IBaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { Store } from './domain';

export interface StoreFilter {
  search?: string;
  organizationId?: string;
  isActive?: boolean;
}
export const STORE_REPO = 'STORE_REPO';

export interface IStoreRepo extends IBaseRepo<Store, string, PageableFilter<StoreFilter>, Filter<StoreFilter>> {
}
