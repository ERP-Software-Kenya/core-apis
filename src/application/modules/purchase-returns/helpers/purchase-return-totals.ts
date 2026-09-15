import { roundReturnMoney } from '../../../shared/helpers/return-number';
import { PurchaseReturn, PurchaseReturnItem } from '../domain';

export function computePurchaseReturnItemTotals(item: PurchaseReturnItem): PurchaseReturnItem {
  item.quantity  = Number(item.quantity ?? 0);
  item.unitCost  = Number(item.unitCost ?? 0);
  item.lineTotal = roundReturnMoney(item.quantity * item.unitCost);
  return item;
}

export function applyPurchaseReturnTotals(ret: PurchaseReturn): PurchaseReturn {
  const items = ret.items ?? [];
  items.forEach(computePurchaseReturnItemTotals);
  ret.totalAmount = roundReturnMoney(items.reduce((acc, item) => acc + item.lineTotal, 0));
  return ret;
}
