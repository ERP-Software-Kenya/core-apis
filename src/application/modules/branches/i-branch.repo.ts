import { IBaseRepo, Filter, PageableFilter } from 'src/common';
import { Branch, BranchFilter } from './domain';

export const BRANCH_REPO = 'BRANCH_REPO';

export interface IBranchRepo extends IBaseRepo<Branch, string, PageableFilter<BranchFilter>, Filter<BranchFilter>> {
  findMainAsync(organizationId: string): Promise<Branch | null>;
  findByManagerIdAsync(userId: string): Promise<Branch | null>;
  setMainAsync(branchId: string, organizationId: string): Promise<Branch>;
  /** Creates a branch. If a concurrent create claims the main-branch slot first, retries as non-main. */
  createBranchAsync(branch: Branch): Promise<Branch>;
}
