export type PurchaseAllocationFunding = { advanceApplied: number; payableCreated: number };
export type PurchasePaymentFunding = { payablePaid: number; advanceCreated: number };

const money = (value: number): number => Number(value.toFixed(4));

export function calculatePurchaseAllocationFunding(
  recognizedBefore: number,
  amountPaid: number,
  allocationValue: number,
): PurchaseAllocationFunding {
  const availableAdvance = Math.max(amountPaid - recognizedBefore, 0);
  const advanceApplied = money(Math.min(availableAdvance, allocationValue));
  return { advanceApplied, payableCreated: money(allocationValue - advanceApplied) };
}

export function calculatePurchasePaymentFunding(
  recognizedValue: number,
  amountPaidBefore: number,
  paymentAmount: number,
): PurchasePaymentFunding {
  const payableOutstanding = Math.max(recognizedValue - amountPaidBefore, 0);
  const payablePaid = money(Math.min(paymentAmount, payableOutstanding));
  return { payablePaid, advanceCreated: money(paymentAmount - payablePaid) };
}
