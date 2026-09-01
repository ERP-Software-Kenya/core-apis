import { AuthenticatedUser, CqrsMediator, LocationAccessDeniedException } from '../../../common';
import { GetLocationQuery } from '../locations/queries/get-location/get-location.query';
import { Location } from '../locations/domain';

/** Cross-branch transfers require org-wide roles (spec). */
export async function assertSameBranchTransferOrOrgWide(
  user: AuthenticatedUser,
  mediator: CqrsMediator,
  fromLocationId: string,
  toLocationId: string,
): Promise<void> {
  if (user.hasOrgWideAccess) return;

  const [from, to] = await Promise.all([
    mediator.execute<GetLocationQuery, Location>(Object.assign(new GetLocationQuery(), { id: fromLocationId })),
    mediator.execute<GetLocationQuery, Location>(Object.assign(new GetLocationQuery(), { id: toLocationId })),
  ]);

  if (from.branchId !== to.branchId) {
    throw new LocationAccessDeniedException(undefined, 'Cross-branch stock transfers require an org-wide role.');
  }
}
