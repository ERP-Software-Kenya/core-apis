import { IBaseRepo, Filter, PageableFilter } from 'src/common';
import { Branch, BranchFilter } from './domain';

export const BRANCH_REPO = 'BRANCH_REPO';

export type IBranchRepo = IBaseRepo<Branch, string, PageableFilter<BranchFilter>, Filter<BranchFilter>>;
