// Standard barrel file
export * from './get-product';
export * from './list-products';
export * from './search-products';

import { GetProductQueryHandler } from './get-product';
import { ListProductsQueryHandler } from './list-products';
import { SearchProductsQueryHandler } from './search-products';

export const ProductQueryHandlers = [
  GetProductQueryHandler,
  ListProductsQueryHandler,
  SearchProductsQueryHandler,
];
