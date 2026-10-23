import { applyPurchaseReturnBranchScope } from '../../../../application/modules/purchase-returns/helpers';

describe('applyPurchaseReturnBranchScope', () => {
  it('adds the purchase-order relation constraint for branch managers', () => {
    expect(applyPurchaseReturnBranchScope({ organizationId: 'org-1', status: 'draft' }, 'branch-1')).toEqual({
      organizationId: 'org-1',
      status: 'draft',
      purchaseOrder: { branchId: 'branch-1' },
    });
  });

  it('does not constrain organization-wide users', () => {
    const where = { organizationId: 'org-1' };
    expect(applyPurchaseReturnBranchScope(where)).toBe(where);
  });
});
