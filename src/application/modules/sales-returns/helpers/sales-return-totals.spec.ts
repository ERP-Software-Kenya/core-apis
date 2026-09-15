import type { SalesReturn, SalesReturnItem } from '../domain';
import { applySalesReturnTotals, computeSalesReturnItemTotals, prorateLineDiscount } from './sales-return-totals';

const item = (over: Partial<SalesReturnItem>): SalesReturnItem => ({ condition: 'restock', ...over } as SalesReturnItem);

describe('sales return totals', () => {
  it('applies discount before tax on a return line', () => {
    const line = computeSalesReturnItemTotals(item({ quantity: 2, unitPrice: 100, taxRate: 18, discountAmount: 50 }));
    expect(line.taxAmount).toBe(27);
    expect(line.lineTotal).toBe(177);
  });

  it('rolls totals up from return items', () => {
    const ret = applySalesReturnTotals({
      items: [
        item({ quantity: 2, unitPrice: 100, taxRate: 18, discountAmount: 50 }),
        item({ quantity: 1, unitPrice: 50, taxRate: 5, discountAmount: 0 }),
      ],
    } as SalesReturn);
    expect(ret.subtotal).toBe(250);
    expect(ret.discountAmount).toBe(50);
    expect(ret.taxAmount).toBe(29.5);
    expect(ret.totalAmount).toBe(229.5);
  });

  it('prorates original line discount by returned quantity', () => {
    expect(prorateLineDiscount(40, 2, 5)).toBe(16);
  });
});
