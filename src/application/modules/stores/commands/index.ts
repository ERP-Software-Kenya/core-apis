// Standard barrel file
export * from './create-store';
export * from './delete-store';
export * from './update-store';

import { CreateStoreCommandHandler } from './create-store';
import { DeleteStoreCommandHandler } from './delete-store';
import { UpdateStoreCommandHandler } from './update-store';

export const StoreCommandHandlers = [
  CreateStoreCommandHandler,
  DeleteStoreCommandHandler,
  UpdateStoreCommandHandler,
];
