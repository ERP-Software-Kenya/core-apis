import { AuthenticatedUser, CqrsMediator, LocationAccessDeniedException } from '../../../common';
import { Location } from '../locations/domain';
import { GetLocationQuery } from '../locations/queries';

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

  if (from.id !== to.id) {
    throw new LocationAccessDeniedException(undefined, 'Cross-branch stock transfers require an org-wide role.');
  }
}
