import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { EExpenseStatus } from '../../../infrastructure/e-expense-status';
import { Expense } from './domain';

export interface ExpenseFilter {
  status?: EExpenseStatus;
  organizationId?: string;
  submittedByUserId?: string;
}

export interface IExpenseRepo extends IBaseRepo<Expense, string, PageableFilter<ExpenseFilter>, Filter<ExpenseFilter>> {
  listAsync(filter: ExpenseFilter): Promise<Expense[]>;
}
