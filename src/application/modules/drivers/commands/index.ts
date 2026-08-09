import { CreateDriverHandler } from './create-driver/create-driver.command-handler';
import { UpdateDriverHandler } from './update-driver/update-driver.command-handler';
import { DeleteDriverHandler } from './delete-driver/delete-driver.command-handler';

export * from './create-driver/create-driver.command';
export * from './update-driver/update-driver.command';
export * from './delete-driver/delete-driver.command';

export const DriverCommandHandlers = [CreateDriverHandler, UpdateDriverHandler, DeleteDriverHandler];
