export function applyPurchaseReturnBranchScope<T extends object>(where: T, branchId?: string): T & { purchaseOrder?: { branchId: string } } {
  if (!branchId) return where;
  return { ...where, purchaseOrder: { branchId } };
}
