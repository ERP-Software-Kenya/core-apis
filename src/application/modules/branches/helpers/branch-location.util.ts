import { LocationAccessDeniedException, LocationNotFoundException } from '../../../../common';
import { ILocationRepo } from '../../locations';

export async function assignLocationsToBranch(
  locationRepo: ILocationRepo,
  params: {
    branchId: string;
    organizationId: string;
    locationIds: string[];
  },
): Promise<void> {
  const uniqueIds = [...new Set(params.locationIds)];
  for (const locationId of uniqueIds) {
    const location = await locationRepo.getAsync(locationId);
    if (!location) {
      throw new LocationNotFoundException(locationId);
    }
    if (location.organizationId !== params.organizationId) {
      throw new LocationAccessDeniedException(undefined, 'Location does not belong to this organization.');
    }
    if (location.branchId && location.branchId !== params.branchId) {
      throw new LocationAccessDeniedException(
        undefined,
        'Location is already assigned to another branch. Use the location transfer flow.',
      );
    }
  }

  // The request is authoritative: omitted locations must be detached as well.
  await locationRepo.replaceBranchAssignmentsAsync(params.branchId, params.organizationId, uniqueIds);
}

export async function loadBranchLocationIds(locationRepo: ILocationRepo, branchId: string): Promise<string[]> {
  return locationRepo.findIdsByBranchIdAsync(branchId);
}
