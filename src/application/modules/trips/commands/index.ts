import { CreateTripHandler } from './create-trip';
import { DeleteTripHandler } from './delete-trip';
import { UpdateTripHandler } from './update-trip';

export * from './create-trip';
export * from './update-trip';
export * from './delete-trip';

export const TripCommandHandlers = [CreateTripHandler, UpdateTripHandler, DeleteTripHandler];
