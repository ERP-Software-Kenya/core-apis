import { CreateDriverHandler } from './create-driver/create-driver.command-handler';

export * from './create-driver/create-driver.command';

export const DriverCommandHandlers = [CreateDriverHandler];
