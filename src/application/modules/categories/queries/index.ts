// Standard barrel file
export * from './get-category';
export * from './list-categories';
export * from './search-categories';

import { GetCategoryQueryHandler } from './get-category';
import { ListCategoriesQueryHandler } from './list-categories';
import { SearchCategoriesQueryHandler } from './search-categories';

export const CategoryQueryHandlers = [
  GetCategoryQueryHandler,
  ListCategoriesQueryHandler,
  SearchCategoriesQueryHandler,
];
