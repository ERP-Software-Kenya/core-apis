import { randomUUID } from 'crypto';
import type { Bill, BillItem } from '../domain';

/** Money columns are decimal(18,4) — keep every derived value at the same precision. */
const round4 = (value: number): number => Math.round((value + Number.EPSILON) * 1e4) / 1e4;

/** Decimal columns can still arrive as strings from raw payloads; coerce defensively. */
const num = (value: unknown): number => {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Normalises an item's numeric fields and recomputes its tax and line total.
 * taxRate is a percentage (18 => 18%) applied after the line discount.
 */
export function computeBillItemTotals(item: BillItem): BillItem {
  item.quantity       = num(item.quantity);
  item.unitPrice      = num(item.unitPrice);
  item.taxRate        = num(item.taxRate);
  item.discountAmount = num(item.discountAmount);

  const gross   = round4(item.quantity * item.unitPrice);
  const taxable = Math.max(round4(gross - item.discountAmount), 0);

  item.taxAmount = round4((taxable * item.taxRate) / 100);
  item.lineTotal = round4(taxable + item.taxAmount);
  return item;
}

/** Recomputes every item and rolls the header totals up from them. */
export function applyBillTotals(bill: Bill): Bill {
  const items = bill.items ?? [];
  items.forEach(computeBillItemTotals);

  bill.subtotal       = round4(items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0));
  bill.discountAmount = round4(items.reduce((acc, i) => acc + i.discountAmount, 0));
  bill.taxAmount      = round4(items.reduce((acc, i) => acc + i.taxAmount, 0));
  bill.totalAmount    = round4(bill.subtotal - bill.discountAmount + bill.taxAmount);
  return bill;
}

/**
 * BILL-YYYYMMDD-<8 hex>. Random suffix rather than a per-org counter so no read
 * is needed before insert; the unique constraint on bill_number is the backstop.
 * ponytail: random suffix, switch to a DB sequence if a gapless daily counter is required.
 */
export function generateBillNumber(now: Date = new Date()): string {
  const day = now.toISOString().slice(0, 10).replace(/-/g, '');
  return `BILL-${day}-${randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}`;
}
