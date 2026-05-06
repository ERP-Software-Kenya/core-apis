export * from './list-item-returns';
export * from './get-item-return';
export * from './search-item-returns';

import { ListItemReturnsQueryHandler } from './list-item-returns';
import { GetItemReturnQueryHandler } from './get-item-return';
import { SearchItemReturnsQueryHandler } from './search-item-returns';

export const ItemReturnQueryHandlers = [
  ListItemReturnsQueryHandler,
  GetItemReturnQueryHandler,
  SearchItemReturnsQueryHandler,
];
