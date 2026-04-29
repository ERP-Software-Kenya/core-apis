// Standard barrel file
export * from './get-store';
export * from './list-stores';
export * from './search-stores';

import { GetStoreQueryHandler } from './get-store';
import { ListStoresQueryHandler } from './list-stores';
import { SearchStoresQueryHandler } from './search-stores';

export const StoreQueryHandlers = [
  GetStoreQueryHandler,
  ListStoresQueryHandler,
  SearchStoresQueryHandler,
];
