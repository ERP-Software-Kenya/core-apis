import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { EExpenseStatus } from '../../../../../infrastructure/e-expense-status';

export class UpdateExpenseStatusCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap(() => String) public status: EExpenseStatus;
}
