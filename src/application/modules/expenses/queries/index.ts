export * from './get-expense';
export * from './list-expenses';

import { GetExpenseQueryHandler } from './get-expense';
import { ListExpensesQueryHandler } from './list-expenses';

export const ExpenseQueryHandlers = [GetExpenseQueryHandler, ListExpensesQueryHandler];
