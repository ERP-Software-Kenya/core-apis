export * from './create-expense';
export * from './update-expense-status';
export * from './upload-expense-receipt';

import { CreateExpenseCommandHandler } from './create-expense';
import { UpdateExpenseStatusCommandHandler } from './update-expense-status';
import { UploadExpenseReceiptCommandHandler } from './upload-expense-receipt';

export const ExpenseCommandHandlers = [
  CreateExpenseCommandHandler,
  UpdateExpenseStatusCommandHandler,
  UploadExpenseReceiptCommandHandler,
];
