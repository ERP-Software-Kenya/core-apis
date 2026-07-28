import { GetStockMovementQueryHandler } from './get-stock-movement';
import { ListMovementsByInventoryQueryHandler } from './list-movements-by-inventory';

export * from './get-stock-movement';
export * from './list-movements-by-inventory';

export const StockMovementQueryHandlers = [
  GetStockMovementQueryHandler,
  ListMovementsByInventoryQueryHandler,
];
