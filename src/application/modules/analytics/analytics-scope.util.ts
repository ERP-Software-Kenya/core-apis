import { ForbiddenException } from '@nestjs/common';
import { AuthenticatedUser } from '../../../common';

/** Resolves location filter; enforces scoped users cannot query other locations. */
export function resolveAnalyticsLocationId(
  user: AuthenticatedUser,
  requested?: string,
): string | undefined {
  if (user.hasOrgWideAccess) {
    return requested || undefined;
  }

  if (!user.locationIds.length) {
    throw new ForbiddenException('No store location assigned to your account');
  }

  if (requested && !user.locationIds.includes(requested)) {
    throw new ForbiddenException('You do not have access to this location');
  }

  return requested || user.locationIds[0];
}

/** All locations a scoped user may query analytics for. */
export function resolveAnalyticsLocationIds(user: AuthenticatedUser, requested?: string): string[] | undefined {
  if (user.hasOrgWideAccess) {
    return requested ? [requested] : undefined;
  }
  if (!user.locationIds.length) {
    throw new ForbiddenException('No store location assigned to your account');
  }
  if (requested) {
    if (!user.locationIds.includes(requested)) {
      throw new ForbiddenException('You do not have access to this location');
    }
    return [requested];
  }
  return user.locationIds;
}
