import { GetProductLogQueryHandler } from './get-product-log';
import { ListLogsByProductQueryHandler } from './list-logs-by-product';
import { ListLogsByInventoryQueryHandler } from './list-logs-by-inventory';

export * from './get-product-log';
export * from './list-logs-by-product';
export * from './list-logs-by-inventory';

export const ProductLogQueryHandlers = [
  GetProductLogQueryHandler,
  ListLogsByProductQueryHandler,
  ListLogsByInventoryQueryHandler,
];
