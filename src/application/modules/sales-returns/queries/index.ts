import { GetSalesReturnQueryHandler } from './get-sales-return/get-sales-return.query-handler';
import { ListSalesReturnsQueryHandler } from './list-sales-returns/list-sales-returns.query-handler';
import { SearchSalesReturnsQueryHandler } from './search-sales-returns/search-sales-returns.query-handler';

export * from './get-sales-return/get-sales-return.query';
export * from './list-sales-returns/list-sales-returns.query';
export * from './search-sales-returns/search-sales-returns.query';

export const SalesReturnQueryHandlers = [
  GetSalesReturnQueryHandler,
  ListSalesReturnsQueryHandler,
  SearchSalesReturnsQueryHandler,
];
