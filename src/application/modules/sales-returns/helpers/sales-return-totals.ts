import { roundReturnMoney } from '../../../shared/helpers/return-number';
import { SalesReturn, SalesReturnItem } from '../domain';

const num = (value: unknown): number => {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
};

export function computeSalesReturnItemTotals(item: SalesReturnItem): SalesReturnItem {
  item.quantity       = num(item.quantity);
  item.unitPrice      = num(item.unitPrice);
  item.taxRate        = num(item.taxRate);
  item.discountAmount = roundReturnMoney(num(item.discountAmount));

  const gross   = roundReturnMoney(item.quantity * item.unitPrice);
  const taxable = Math.max(roundReturnMoney(gross - item.discountAmount), 0);
  item.taxAmount = roundReturnMoney((taxable * item.taxRate) / 100);
  item.lineTotal = roundReturnMoney(taxable + item.taxAmount);
  return item;
}

export function applySalesReturnTotals(ret: SalesReturn): SalesReturn {
  const items = ret.items ?? [];
  items.forEach(computeSalesReturnItemTotals);
  ret.subtotal       = roundReturnMoney(items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0));
  ret.discountAmount = roundReturnMoney(items.reduce((acc, item) => acc + item.discountAmount, 0));
  ret.taxAmount      = roundReturnMoney(items.reduce((acc, item) => acc + item.taxAmount, 0));
  ret.totalAmount    = roundReturnMoney(ret.subtotal - ret.discountAmount + ret.taxAmount);
  return ret;
}

export function prorateLineDiscount(originalDiscount: number, returnQty: number, originalQty: number): number {
  if (!originalQty) return 0;
  return roundReturnMoney((num(originalDiscount) * returnQty) / originalQty);
}
