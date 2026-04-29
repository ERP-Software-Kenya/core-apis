// Standard barrel file
export * from './get-supplier';
export * from './list-suppliers';
export * from './search-suppliers';

import { GetSupplierQueryHandler } from './get-supplier';
import { ListSuppliersQueryHandler } from './list-suppliers';
import { SearchSuppliersQueryHandler } from './search-suppliers';

export const SupplierQueryHandlers = [
  GetSupplierQueryHandler,
  ListSuppliersQueryHandler,
  SearchSuppliersQueryHandler,
];
