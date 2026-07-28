import { CreateLocationCommandHandler } from './create-location';
import { UpdateLocationCommandHandler } from './update-location';
import { DeleteLocationCommandHandler } from './delete-location';
import { UploadLocationImageCommandHandler } from './upload-location-image';
import { RemoveLocationImageCommandHandler } from './remove-location-image';

export * from './create-location';
export * from './update-location';
export * from './delete-location';
export * from './upload-location-image';
export * from './remove-location-image';

export const LocationCommandHandlers = [
  CreateLocationCommandHandler,
  UpdateLocationCommandHandler,
  DeleteLocationCommandHandler,
  UploadLocationImageCommandHandler,
  RemoveLocationImageCommandHandler,
];
