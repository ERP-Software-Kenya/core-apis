export * from './upsert-branch-product-price';
export * from './copy-main-branch-prices';

import { UpsertBranchProductPriceCommandHandler } from './upsert-branch-product-price';
import { CopyMainBranchPricesCommandHandler } from './copy-main-branch-prices';

export const ProductBranchPriceCommandHandlers = [
  UpsertBranchProductPriceCommandHandler,
  CopyMainBranchPricesCommandHandler,
];
