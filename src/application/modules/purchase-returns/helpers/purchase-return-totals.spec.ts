import type { PurchaseReturn, PurchaseReturnItem } from '../domain';
import { applyPurchaseReturnTotals, computePurchaseReturnItemTotals } from './purchase-return-totals';

describe('purchase return totals', () => {
  it('computes return line value from quantity and unit cost', () => {
    const line = computePurchaseReturnItemTotals({ quantity: 2.5, unitCost: 20 } as PurchaseReturnItem);
    expect(line.lineTotal).toBe(50);
  });

  it('rolls total amount up from return items', () => {
    const ret = applyPurchaseReturnTotals({
      items: [
        { quantity: 2, unitCost: 10 },
        { quantity: 3, unitCost: 7.5 },
      ],
    } as PurchaseReturn);
    expect(ret.totalAmount).toBe(42.5);
  });
});
