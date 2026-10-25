import { Filter, IBaseRepo, PageableFilter } from '../../../common';
import { EPurchaseReturnItemSourceType, EPurchaseReturnStatus } from '../../../infrastructure/persistence/entities';
import { PurchaseReturnItem } from './domain';

export interface PurchaseReturnItemFilter {
  purchaseReturnId?: string;
  purchaseItemId?: string;
  sourceType?: EPurchaseReturnItemSourceType;
  locationId?: string;
}

export interface IPurchaseReturnItemRepo extends IBaseRepo<PurchaseReturnItem, string, PageableFilter<PurchaseReturnItemFilter>, Filter<PurchaseReturnItemFilter>> {
  sumFinalizedQuantityByPurchaseItemAsync(purchaseItemId: string, excludePurchaseReturnId?: string): Promise<number>;
  sumFinalizedQuantityByPurchaseItemAndSourceAsync(
    purchaseItemId: string,
    sourceType: EPurchaseReturnItemSourceType,
    excludePurchaseReturnId?: string,
  ): Promise<number>;
  sumFinalizedAllocatedQuantityByPurchaseItemLocationAsync(purchaseItemId: string, locationId: string, excludePurchaseReturnId?: string): Promise<number>;
  allWithReturnStatusAsync(purchaseReturnId: string, status?: EPurchaseReturnStatus): Promise<PurchaseReturnItem[]>;
}
