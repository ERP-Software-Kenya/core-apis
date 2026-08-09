import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';
import { EExpenseType } from 'src/application/shared/enums/e-expense-type';

export class CreateVehicleExpenseCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public vehicleId: string;
  @AutoMap(() => String) public expenseType: EExpenseType;
  @AutoMap() public amount: number;
  @AutoMap() public expenseDate: Date;
  @AutoMap() public description?: string;
  @AutoMap() public tripId?: string;
}
