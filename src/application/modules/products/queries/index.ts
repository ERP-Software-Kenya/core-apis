// Standard barrel file
export * from './get-product';
export * from './list-products';
export * from './search-products';
export * from './get-product-image-upload-url';
export * from './list-product-images';

import { GetProductQueryHandler } from './get-product';
import { ListProductsQueryHandler } from './list-products';
import { SearchProductsQueryHandler } from './search-products';
import { GetProductImageUploadUrlQueryHandler } from './get-product-image-upload-url';
import { ListProductImagesQueryHandler } from './list-product-images';

export const ProductQueryHandlers = [
  GetProductQueryHandler,
  ListProductsQueryHandler,
  SearchProductsQueryHandler,
  GetProductImageUploadUrlQueryHandler,
  ListProductImagesQueryHandler,
];
