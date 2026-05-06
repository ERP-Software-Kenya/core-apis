import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateExpenseCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public storeId?: string;
  @AutoMap() public category: string;
  @AutoMap() public amount: number;
  @AutoMap() public expenseDate: Date;
  @AutoMap() public description?: string;
}
