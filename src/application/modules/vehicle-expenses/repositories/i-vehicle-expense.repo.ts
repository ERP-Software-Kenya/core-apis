import { IBaseRepo } from '../../../../common/db/i-base.repo';
import { VehicleExpense } from '../domain/vehicle-expense.model';

export interface IVehicleExpenseRepo extends IBaseRepo<VehicleExpense, string> {}
