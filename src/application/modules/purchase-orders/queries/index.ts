// Standard barrel file
export * from './get-purchaseorder';
export * from './list-purchase-orders';
export * from './search-purchase-orders';

import { GetPurchaseOrderQueryHandler } from './get-purchaseorder';
import { ListPurchaseOrdersQueryHandler } from './list-purchase-orders';
import { SearchPurchaseOrdersQueryHandler } from './search-purchase-orders';

export const PurchaseOrderQueryHandlers = [
  GetPurchaseOrderQueryHandler,
  ListPurchaseOrdersQueryHandler,
  SearchPurchaseOrdersQueryHandler,
];
