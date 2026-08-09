export * from './create-expense';
export * from './update-expense-status';

import { CreateExpenseCommandHandler } from './create-expense';
import { UpdateExpenseStatusCommandHandler } from './update-expense-status';

export const ExpenseCommandHandlers = [CreateExpenseCommandHandler, UpdateExpenseStatusCommandHandler];
