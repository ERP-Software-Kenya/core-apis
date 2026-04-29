import { IBaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { Product } from './domain';

export interface ProductFilter {
  search?: string;
  isActive?: boolean;
}

export const PRODUCT_REPO = 'PRODUCT_REPO';

export interface IProductRepo extends IBaseRepo<Product, string, PageableFilter<ProductFilter>, Filter<ProductFilter>> {
}
