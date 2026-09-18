export interface CalculatedQuotationItem {
  productId: string;
  variantId?: string;
  quantity: number;
  unitPriceInclusive: number;
  unitTaxable: number;
  taxRate: number;
  taxAmount: number;
  lineTotal: number;
}

export interface CalculatedQuotationTotals {
  items: CalculatedQuotationItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
}

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function round4(value: number): number {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
}

export function calculateQuotationTotals(
  rawItems: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
    unitPriceInclusive: number;
    taxRate?: number;
  }>,
): CalculatedQuotationTotals {
  const items: CalculatedQuotationItem[] = [];
  let subtotalAcc = 0;
  let taxAmountAcc = 0;
  let totalAmountAcc = 0;

  for (const item of rawItems) {
    const qty = Number(item.quantity);
    const unitPriceInc = Number(item.unitPriceInclusive);
    const taxRate = Number(item.taxRate ?? 0);

    const lineTotal = round2(qty * unitPriceInc);
    const unitTaxable = taxRate > 0 ? round4(unitPriceInc / (1 + taxRate / 100)) : round4(unitPriceInc);
    const lineTaxable = round4(unitTaxable * qty);
    const lineTaxAmount = round4(lineTotal - lineTaxable);

    items.push({
      productId: item.productId,
      variantId: item.variantId,
      quantity: qty,
      unitPriceInclusive: unitPriceInc,
      unitTaxable,
      taxRate,
      taxAmount: lineTaxAmount,
      lineTotal,
    });

    subtotalAcc += lineTaxable;
    taxAmountAcc += lineTaxAmount;
    totalAmountAcc += lineTotal;
  }

  return {
    items,
    subtotal: round4(subtotalAcc),
    taxAmount: round4(taxAmountAcc),
    totalAmount: round2(totalAmountAcc),
  };
}
