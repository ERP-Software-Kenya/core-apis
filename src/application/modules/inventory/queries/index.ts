import { GetInventoryQueryHandler } from './get-inventory';
import { ListInventoryQueryHandler } from './list-inventory';
import { SearchInventoryQueryHandler } from './search-inventory';
import { GetLowStockQueryHandler } from './get-low-stock';
import { GetValuationQueryHandler } from './get-valuation';

export * from './get-inventory';
export * from './list-inventory';
export * from './search-inventory';
export * from './get-low-stock';
export * from './get-valuation';

export const InventoryQueryHandlers = [
  GetInventoryQueryHandler,
  ListInventoryQueryHandler,
  SearchInventoryQueryHandler,
  GetLowStockQueryHandler,
  GetValuationQueryHandler,
];
