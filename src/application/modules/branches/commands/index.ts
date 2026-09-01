export * from './create-branch';
export * from './update-branch';

import { CreateBranchCommandHandler } from './create-branch';
import { UpdateBranchCommandHandler } from './update-branch';

export const BranchCommandHandlers = [
  CreateBranchCommandHandler,
  UpdateBranchCommandHandler,
];
