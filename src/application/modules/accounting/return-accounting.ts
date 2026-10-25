export type PurchaseReturnSettlement = {
  payableReduction: number;
  supplierCredit: number;
};

const money = (value: number): number => Number(value.toFixed(4));

/** Splits an allocated purchase return between unpaid AP and an amount due back from the supplier. */
export function calculatePurchaseReturnSettlement(
  allocatedValue: number,
  priorAllocatedReturns: number,
  amountPaid: number,
  returnValue: number,
): PurchaseReturnSettlement {
  const recognizedBeforeReturn = Math.max(allocatedValue - priorAllocatedReturns, 0);
  const payableOutstanding = Math.max(recognizedBeforeReturn - amountPaid, 0);
  const total = money(returnValue);
  const payableReduction = money(Math.min(total, payableOutstanding));
  return {
    payableReduction,
    supplierCredit: money(total - payableReduction),
  };
}

/** Reverses the same proportion of commission as the value of goods returned. */
export function calculateCommissionReversal(
  commissionAmount: number,
  billTotal: number,
  returnTotal: number,
): number {
  if (billTotal <= 0 || commissionAmount <= 0 || returnTotal <= 0) return 0;
  return money((commissionAmount * returnTotal) / billTotal);
}

export function calculateSupplierCreditOutstanding(supplierCredit: number, refundedAmount: number): number {
  return money(Math.max(supplierCredit - refundedAmount, 0));
}
