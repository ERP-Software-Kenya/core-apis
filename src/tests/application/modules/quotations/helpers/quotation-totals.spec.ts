import { calculateQuotationTotals } from '../../../../../application/modules/quotations/helpers';

describe('calculateQuotationTotals', () => {
  it('separates tax-inclusive prices into taxable value and tax', () => {
    const result = calculateQuotationTotals([
      { productId: 'product-1', quantity: 2, unitPriceInclusive: 118, taxRate: 18 },
    ]);

    expect(result).toEqual({
      items: [{
        productId: 'product-1',
        variantId: undefined,
        quantity: 2,
        unitPriceInclusive: 118,
        unitTaxable: 100,
        taxRate: 18,
        taxAmount: 36,
        lineTotal: 236,
      }],
      subtotal: 200,
      taxAmount: 36,
      totalAmount: 236,
    });
  });

  it('keeps zero-rated items tax free', () => {
    const result = calculateQuotationTotals([
      { productId: 'product-1', quantity: 1.5, unitPriceInclusive: 10.25, taxRate: 0 },
    ]);

    expect(result.subtotal).toBe(15.38);
    expect(result.taxAmount).toBe(0);
    expect(result.totalAmount).toBe(15.38);
  });

  it('rounds each line before accumulating the document total', () => {
    const result = calculateQuotationTotals([
      { productId: 'p1', quantity: 3, unitPriceInclusive: 0.333, taxRate: 0 },
      { productId: 'p2', quantity: 3, unitPriceInclusive: 0.333, taxRate: 0 },
    ]);

    expect(result.items.map((item) => item.lineTotal)).toEqual([1, 1]);
    expect(result.totalAmount).toBe(2);
  });
});
