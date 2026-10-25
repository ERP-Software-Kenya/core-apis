import { GetPurchaseReturnQueryHandler } from './get-purchase-return/get-purchase-return.query-handler';
import { ListPurchaseReturnsQueryHandler } from './list-purchase-returns/list-purchase-returns.query-handler';
import { SearchPurchaseReturnsQueryHandler } from './search-purchase-returns/search-purchase-returns.query-handler';

export * from './get-purchase-return/get-purchase-return.query';
export * from './list-purchase-returns/list-purchase-returns.query';
export * from './search-purchase-returns/search-purchase-returns.query';

export const PurchaseReturnQueryHandlers = [
  GetPurchaseReturnQueryHandler,
  ListPurchaseReturnsQueryHandler,
  SearchPurchaseReturnsQueryHandler,
];
