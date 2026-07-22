import { AutoMap } from '@automapper/classes';
import { EExpenseType } from '../../../shared/enums/e-expense-type';

export class VehicleExpense {
  @AutoMap() public id: string;
  @AutoMap() public vehicleId: string;
  @AutoMap() public expenseType: EExpenseType;
  @AutoMap() public amount: number;
  @AutoMap() public expenseDate: Date;
}
