// Type-only imports: the domain barrel pulls in @automapper/classes (ESM), which
// this repo's jest transform does not handle. The maths under test needs neither.
import type { Bill, BillItem } from '../domain';
import { applyBillTotals, computeBillItemTotals, generateBillNumber } from './bill-totals';

const item = (over: Partial<BillItem>): BillItem => over as BillItem;

describe('bill totals', () => {
  it('applies discount before tax on a line', () => {
    const line = computeBillItemTotals(item({ quantity: 2, unitPrice: 100, taxRate: 18, discountAmount: 50 }));
    expect(line.taxAmount).toBe(27); // (200 - 50) * 18%
    expect(line.lineTotal).toBe(177);
  });

  it('treats missing numeric fields as zero', () => {
    const line = computeBillItemTotals(item({ quantity: 3, unitPrice: 10 }));
    expect(line.taxRate).toBe(0);
    expect(line.discountAmount).toBe(0);
    expect(line.lineTotal).toBe(30);
  });

  it('never taxes a negative base when the discount exceeds the line', () => {
    const line = computeBillItemTotals(item({ quantity: 1, unitPrice: 10, taxRate: 18, discountAmount: 40 }));
    expect(line.taxAmount).toBe(0);
    expect(line.lineTotal).toBe(0);
  });

  it('rolls header totals up from the items', () => {
    const bill = {
      items: [
        item({ quantity: 2, unitPrice: 100, taxRate: 18, discountAmount: 50 }),
        item({ quantity: 1, unitPrice: 50, taxRate: 5 }),
      ],
    } as Bill;
    applyBillTotals(bill);
    expect(bill.subtotal).toBe(250);
    expect(bill.discountAmount).toBe(50);
    expect(bill.taxAmount).toBe(29.5); // 27 + 2.5
    expect(bill.totalAmount).toBe(229.5);
  });

  it('zeroes totals for a bill with no items', () => {
    const bill = applyBillTotals({} as Bill);
    expect([bill.subtotal, bill.taxAmount, bill.discountAmount, bill.totalAmount]).toEqual([0, 0, 0, 0]);
  });

  it('generates a dated, unique-ish bill number', () => {
    expect(generateBillNumber(new Date('2026-08-09T10:00:00Z'))).toMatch(/^BILL-20260809-[0-9A-F]{8}$/);
    expect(generateBillNumber()).not.toBe(generateBillNumber());
  });
});
