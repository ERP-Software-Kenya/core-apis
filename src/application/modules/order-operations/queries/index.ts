export * from './get-order-queue/get-order-queue.query';
export * from './get-order-queue/get-order-queue.query-handler';
export * from './get-packed-orders';
export * from './get-ready-for-pickup';

import { GetOrderQueueQueryHandler } from './get-order-queue/get-order-queue.query-handler';
import { SearchPackedOrdersQueryHandler } from './get-packed-orders/get-packed-orders.query-handler';
import { SearchReadyForPickupQueryHandler } from './get-ready-for-pickup/get-ready-for-pickup.query-handler';

export const OrderOperationQueryHandlers = [
  GetOrderQueueQueryHandler,
  SearchPackedOrdersQueryHandler,
  SearchReadyForPickupQueryHandler,
];
