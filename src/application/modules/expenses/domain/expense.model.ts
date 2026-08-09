import { AutoMap } from '@automapper/classes';
import { EExpenseStatus } from '../../../../infrastructure/e-expense-status';

export class Expense {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public category: string;
  @AutoMap() public amount: number;
  @AutoMap() public description?: string;
  @AutoMap(() => String) public status: EExpenseStatus;
  @AutoMap() public submittedBy?: string;
  @AutoMap(() => Date) public expenseDate: Date;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
