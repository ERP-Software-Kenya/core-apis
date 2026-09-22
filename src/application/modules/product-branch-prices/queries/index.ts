export * from './list-branch-product-prices';
export * from './get-branch-product-price';

import { ListBranchProductPricesQueryHandler } from './list-branch-product-prices';
import { GetBranchProductPriceQueryHandler } from './get-branch-product-price';

export const ProductBranchPriceQueryHandlers = [
  ListBranchProductPricesQueryHandler,
  GetBranchProductPriceQueryHandler,
];
