import { CreateVehicleExpenseHandler } from './create-vehicle-expense/create-vehicle-expense.command-handler';
import { DeleteVehicleExpenseHandler } from './delete-vehicle-expense/delete-vehicle-expense.command-handler';

export * from './create-vehicle-expense/create-vehicle-expense.command';
export * from './delete-vehicle-expense/delete-vehicle-expense.command';

export const VehicleExpenseCommandHandlers = [CreateVehicleExpenseHandler, DeleteVehicleExpenseHandler];
