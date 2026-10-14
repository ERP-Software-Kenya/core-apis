import { ECustomerType } from '../../../../infrastructure/persistence/entities';
import { Product } from '../../products/domain';
import { ProductBranchPrice } from '../domain';

const WHOLESALE_TYPES = new Set<string>([ECustomerType.Shop, ECustomerType.BigCustomer]);

/**
 * Resolves the effective unit price for a product at a specific branch.
 *
 * Tier selection: Shop / BigCustomer → wholesale; all others → retail.
 * For each tier: branch override wins if non-null, else falls back to the
 * org-level price on the products table.
 */
export function resolveBranchPrice(
  branchPrice: ProductBranchPrice | null,
  product: Product,
  customerType?: ECustomerType,
): number {
  if (WHOLESALE_TYPES.has(customerType ?? '')) {
    const bp = branchPrice?.wholesalePrice;
    if (bp !== null && bp !== undefined) return Number(bp);
    return Number(product.wholesalePrice ?? product.retailPrice ?? 0);
  }

  const bp = branchPrice?.retailPrice;
  if (bp !== null && bp !== undefined) return Number(bp);
  return Number(product.retailPrice ?? 0);
}
