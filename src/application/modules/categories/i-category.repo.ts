import { IBaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { Category } from './domain';

export interface CategoryFilter {
  name?: string;
  isActive?: boolean;
}
export const CATEGORY_REPO = 'CATEGORY_REPO';

export interface ICategoryRepo extends IBaseRepo<Category, string, PageableFilter<CategoryFilter>, Filter<CategoryFilter>> {
}
