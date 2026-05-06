export * from './list-bills/list-bills.query';
export * from './list-bills/list-bills.query-handler';
export * from './get-bill/get-bill.query';
export * from './get-bill/get-bill.query-handler';
export * from './search-bills/search-bills.query';
export * from './search-bills/search-bills.query-handler';

import { ListBillsQueryHandler } from './list-bills/list-bills.query-handler';
import { GetBillQueryHandler } from './get-bill/get-bill.query-handler';
import { SearchBillsQueryHandler } from './search-bills/search-bills.query-handler';

export const BillQueryHandlers = [
  ListBillsQueryHandler,
  GetBillQueryHandler,
  SearchBillsQueryHandler,
];