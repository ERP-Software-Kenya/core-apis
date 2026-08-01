export * from './create-store';
export * from './delete-store';
export * from './update-store';
export * from './upload-store-image';
export * from './remove-store-image';

import { CreateStoreCommandHandler } from './create-store';
import { DeleteStoreCommandHandler } from './delete-store';
import { UpdateStoreCommandHandler } from './update-store';
import { UploadStoreImageCommandHandler } from './upload-store-image';
import { RemoveStoreImageCommandHandler } from './remove-store-image';

export const StoreCommandHandlers = [
  CreateStoreCommandHandler,
  DeleteStoreCommandHandler,
  UpdateStoreCommandHandler,
  UploadStoreImageCommandHandler,
  RemoveStoreImageCommandHandler,
];
