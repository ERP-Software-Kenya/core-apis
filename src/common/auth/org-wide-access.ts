type RoleLike = string | { name?: string | null } | null | undefined;
type ScopedRoleAssignment = { locationId?: string | null; branchId?: string | null; role?: RoleLike };
type OrgRoleAssignment = { role?: RoleLike };

const ORG_WIDE_ROLE_NAMES = new Set(['super_admin', 'org_admin', 'org_manager']);

function roleName(role: RoleLike): string | undefined {
  if (!role) return undefined;
  return typeof role === 'string' ? role : role.name ?? undefined;
}

export function computeHasOrgWideAccess(
  userRoles: ScopedRoleAssignment[],
  orgMembers: OrgRoleAssignment[],
): boolean {
  return (
    userRoles.some((ur) => !ur.locationId && !ur.branchId && ORG_WIDE_ROLE_NAMES.has(roleName(ur.role) ?? '')) ||
    orgMembers.some((om) => ORG_WIDE_ROLE_NAMES.has(roleName(om.role) ?? ''))
  );
}
