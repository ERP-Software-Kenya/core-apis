import { IBaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { Supplier } from './domain';

export interface SupplierFilter {
  search?: string;
  isActive?: boolean;
}

export const SUPPLIER_REPO = 'SUPPLIER_REPO';

export interface ISupplierRepo extends IBaseRepo<Supplier, string, PageableFilter<SupplierFilter>, Filter<SupplierFilter>> {
}
