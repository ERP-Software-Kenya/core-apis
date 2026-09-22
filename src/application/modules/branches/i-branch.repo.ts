import { IBaseRepo, Filter, PageableFilter } from 'src/common';
import { Branch, BranchFilter } from './domain';

export const BRANCH_REPO = 'BRANCH_REPO';

export interface IBranchRepo extends IBaseRepo<Branch, string, PageableFilter<BranchFilter>, Filter<BranchFilter>> {
  findMainAsync(organizationId: string): Promise<Branch | null>;
}
