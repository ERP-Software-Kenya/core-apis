export * from './create-stock-transfer';
export * from './complete-stock-transfer';
export * from './cancel-stock-transfer';
import { CreateStockTransferCommandHandler } from './create-stock-transfer';
import { CompleteStockTransferCommandHandler } from './complete-stock-transfer';
import { CancelStockTransferCommandHandler } from './cancel-stock-transfer';
export const StockTransferCommandHandlers = [
  CreateStockTransferCommandHandler,
  CompleteStockTransferCommandHandler,
  CancelStockTransferCommandHandler,
];
