import { IBaseRepo, Filter, PageableFilter } from 'src/common';
import { Location, LocationFilter } from 'src/application/modules/locations/domain';

export const LOCATION_REPO = 'LOCATION_REPO';

export interface BranchLocationRow {
  id: string;
  branchId: string;
}

export interface ILocationRepo extends IBaseRepo<Location, string, PageableFilter<LocationFilter>, Filter<LocationFilter>> {
  findIdsByBranchIdAsync(branchId: string): Promise<string[]>;
  findByBranchIdsAsync(branchIds: string[]): Promise<BranchLocationRow[]>;
  assignBranchAsync(branchId: string, locationIds: string[]): Promise<void>;
}
