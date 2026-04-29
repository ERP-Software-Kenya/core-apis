// Standard barrel file
export * from './get-inventory';
export * from './list-inventory';
export * from './search-inventory';

import { GetInventoryQueryHandler } from './get-inventory';
import { ListInventoryQueryHandler } from './list-inventory';
import { SearchInventoryQueryHandler } from './search-inventory';

export const InventoryQueryHandlers = [
  GetInventoryQueryHandler,
  ListInventoryQueryHandler,
  SearchInventoryQueryHandler,
];
