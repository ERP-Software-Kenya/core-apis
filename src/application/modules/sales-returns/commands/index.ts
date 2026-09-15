import { CancelSalesReturnCommandHandler } from './cancel-sales-return/cancel-sales-return.command-handler';
import { CreateSalesReturnCommandHandler } from './create-sales-return/create-sales-return.command-handler';
import { FinalizeSalesReturnCommandHandler } from './finalize-sales-return/finalize-sales-return.command-handler';
import { UpdateSalesReturnCommandHandler } from './update-sales-return/update-sales-return.command-handler';

export * from './cancel-sales-return/cancel-sales-return.command';
export * from './create-sales-return/create-sales-return.command';
export * from './finalize-sales-return/finalize-sales-return.command';
export * from './update-sales-return/update-sales-return.command';

export const SalesReturnCommandHandlers = [
  CancelSalesReturnCommandHandler,
  CreateSalesReturnCommandHandler,
  FinalizeSalesReturnCommandHandler,
  UpdateSalesReturnCommandHandler,
];
