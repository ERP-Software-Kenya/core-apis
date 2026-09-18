import { Quotation } from '../domain';

export function buildQuotationPdfContext(
  quotation: Quotation,
  organizationName = 'Pramukh Digital ERP',
): Record<string, unknown> {
  const fmtDate = (d?: Date | string | null) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const createdByName = quotation.createdByUser
    ? `${quotation.createdByUser.firstName ?? ''} ${quotation.createdByUser.lastName ?? ''}`.trim()
    : undefined;

  return {
    organizationName,
    locationName: quotation.location?.name,
    locationAddress: quotation.location?.address,
    locationPhone: quotation.location?.phone,
    quoteNumber: quotation.quoteNumber,
    versionNumber: quotation.versionNumber,
    status: quotation.status,
    customerName: quotation.customer?.name ?? 'Valued Customer',
    customerPhone: quotation.customer?.phone,
    customerEmail: quotation.customer?.email,
    customerGstin: quotation.customer?.gstin,
    customerAddress: quotation.customer?.address,
    date: fmtDate(quotation.createdAt),
    createdByName,
    items: (quotation.items ?? []).map((item, idx) => ({
      index: idx + 1,
      name: item.product?.name ?? 'Product',
      sku: item.product?.sku ?? '',
      quantity: item.quantity,
      rate: Number(item.unitPriceInclusive).toFixed(2),
      taxRate: item.taxRate,
      taxAmount: Number(item.taxAmount).toFixed(2),
      lineTotal: Number(item.lineTotal).toFixed(2),
    })),
    subtotal: Number(quotation.subtotal).toFixed(2),
    taxAmount: Number(quotation.taxAmount).toFixed(2),
    totalAmount: Number(quotation.totalAmount).toFixed(2),
    notes: quotation.notes,
    generatedAt: fmtDate(new Date()),
  };
}
