import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';
import { EExpenseStatus } from '../../../../../infrastructure/e-expense-status';

export class ListExpensesQuery extends QueryBase {
  @AutoMap(() => String) public status?: EExpenseStatus;
  @AutoMap() public organizationId?: string;
}
