export * from './get-branch';
export * from './list-branches';
export * from './search-branches';

import { GetBranchQueryHandler } from './get-branch';
import { ListBranchesQueryHandler } from './list-branches';
import { SearchBranchesQueryHandler } from './search-branches';

export const BranchQueryHandlers = [
  GetBranchQueryHandler,
  ListBranchesQueryHandler,
  SearchBranchesQueryHandler,
];
