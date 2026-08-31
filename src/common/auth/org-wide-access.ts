export function computeHasOrgWideAccess(
  userRoles: { locationId?: string | null; branchId?: string | null }[],
  orgMemberCount: number,
): boolean {
  if (userRoles.some((ur) => !ur.locationId && !ur.branchId)) return true;
  if (userRoles.some((ur) => ur.locationId || ur.branchId)) return false;
  return orgMemberCount > 0;
}
