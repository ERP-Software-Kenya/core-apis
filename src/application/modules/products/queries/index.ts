// Standard barrel file
export * from './get-product';
export * from './list-products';
export * from './search-products';
export * from './get-product-image-upload-url';

import { GetProductQueryHandler } from './get-product';
import { ListProductsQueryHandler } from './list-products';
import { SearchProductsQueryHandler } from './search-products';
import { GetProductImageUploadUrlQueryHandler } from './get-product-image-upload-url';

export const ProductQueryHandlers = [
  GetProductQueryHandler,
  ListProductsQueryHandler,
  SearchProductsQueryHandler,
  GetProductImageUploadUrlQueryHandler,
];
