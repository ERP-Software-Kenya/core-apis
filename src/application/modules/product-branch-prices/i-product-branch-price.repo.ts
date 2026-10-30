import { IBaseRepo, IPageable } from 'src/common';
import { ProductBranchPrice } from './domain';

export const PRODUCT_BRANCH_PRICE_REPO = 'PRODUCT_BRANCH_PRICE_REPO';

export type EBranchPriceStatus = 'set' | 'not_set';

export interface IProductBranchPriceRepo extends IBaseRepo<ProductBranchPrice, string> {
  upsertAsync(model: ProductBranchPrice): Promise<ProductBranchPrice>;
  listByBranchAsync(
    branchId: string,
    organizationId: string,
    page: number,
    perPage: number,
    search?: string,
    status?: EBranchPriceStatus,
  ): Promise<IPageable<ProductBranchPrice>>;
  copyFromMainBranchAsync(mainBranchId: string, targetBranchId: string, organizationId: string): Promise<void>;
  getByBranchAndProductAsync(branchId: string, productId: string): Promise<ProductBranchPrice | null>;
}
