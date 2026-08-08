import { CreateMaintenanceHandler } from './create-maintenance/create-maintenance.command-handler';

export * from './create-maintenance/create-maintenance.command';

export const MaintenanceCommandHandlers = [CreateMaintenanceHandler];
