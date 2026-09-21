export * from './create-branch';
export * from './update-branch';
export * from './set-main-branch';

import { CreateBranchCommandHandler } from './create-branch';
import { UpdateBranchCommandHandler } from './update-branch';
import { SetMainBranchCommandHandler } from './set-main-branch';

export const BranchCommandHandlers = [
  CreateBranchCommandHandler,
  UpdateBranchCommandHandler,
  SetMainBranchCommandHandler,
];
