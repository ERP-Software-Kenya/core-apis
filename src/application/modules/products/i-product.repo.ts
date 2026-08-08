import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Product, ProductFilter } from './domain';

export interface IProductRepo extends IBaseRepo<Product, string, PageableFilter<ProductFilter>, Filter<ProductFilter>> {
}
