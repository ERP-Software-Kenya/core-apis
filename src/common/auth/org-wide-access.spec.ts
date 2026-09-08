import { computeHasOrgWideAccess } from './org-wide-access';

describe('computeHasOrgWideAccess', () => {
  it('is org-wide when an admin user_role has no store or branch scope', () => {
    expect(computeHasOrgWideAccess([{ locationId: null, branchId: null, role: { name: 'org_admin' } }], [])).toBe(true);
  });

  it('is not org-wide when a branch manager has no branch scope', () => {
    expect(computeHasOrgWideAccess([{ locationId: null, branchId: null, role: { name: 'branch_manager' } }], [])).toBe(false);
  });

  it('is branch-scoped when user_role has branchId only', () => {
    expect(computeHasOrgWideAccess([{ locationId: null, branchId: 'branch-1', role: { name: 'branch_manager' } }], [{ role: { name: 'branch_manager' } }])).toBe(false);
  });

  it('is store-scoped when the only user_role has a store, even with org_members', () => {
    expect(computeHasOrgWideAccess([{ locationId: 'loc-1', role: { name: 'store_manager' } }], [{ role: { name: 'store_manager' } }])).toBe(false);
  });

  it('is org-wide for onboarded OrgAdmin with membership but no user_roles yet', () => {
    expect(computeHasOrgWideAccess([], [{ role: { name: 'org_admin' } }])).toBe(true);
  });

  it('is not org-wide with neither membership nor roles', () => {
    expect(computeHasOrgWideAccess([], [])).toBe(false);
  });
});
