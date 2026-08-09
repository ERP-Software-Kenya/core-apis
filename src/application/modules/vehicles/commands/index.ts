import { CreateVehicleHandler } from './create-vehicle';
import { DeleteVehicleHandler } from './delete-vehicle';
import { UpdateVehicleHandler } from './update-vehicle';

export * from './create-vehicle';
export * from './update-vehicle';
export * from './delete-vehicle';

export const VehicleCommandHandlers = [CreateVehicleHandler, UpdateVehicleHandler, DeleteVehicleHandler];
