import { LocationAccessDeniedException } from '../exceptions';
import { AuthenticatedUser } from './types';

/**
 * Applies branch or org-wide scope to any query object that supports these fields.
 * - SuperAdmin / OrgAdmin: org-wide (organizationId only, no further filter)
 * - BranchManager: scoped to their branch (branchId) and its locations (accessibleLocationIds)
 * - Driver / Packer: org-wide (access controlled by role permissions, not data scope)
 */
export function applyAccessScope<T extends {
  organizationId?: string;
  branchId?: string;
  accessibleLocationIds?: string[];
}>(user: AuthenticatedUser, query: T): void {
  query.organizationId = user.organizationId;
  if (user.hasOrgWideAccess) return;
  if (user.branchId) {
    query.branchId = user.branchId;
    return;
  }
  query.accessibleLocationIds = user.locationIds;
}

export function assertBranchAccess(user: AuthenticatedUser, branchId: string): void {
  if (user.hasOrgWideAccess) return;
  if (user.branchId === branchId) return;
  throw new LocationAccessDeniedException(undefined, 'Access denied: branch is not accessible to this user.');
}

