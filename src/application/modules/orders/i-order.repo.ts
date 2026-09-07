import { IBaseRepo, Filter, IPageable, PageableFilter } from '../../../common';
import { Order } from './domain';

export type OrderFilter = {
  organizationId?: string;
  status?: string;
  fulfillmentMode?: string;
  search?: string;
};

export type PackedOrderRow = {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  deliveryAddress: string;
  pickerName: string;
  packedAt: Date;
  itemCount: number;
  locationId: string;
  organizationId: string;
  fulfillmentMode?: string;
};

export interface IOrderRepo extends IBaseRepo<Order, string, PageableFilter<OrderFilter>, Filter<OrderFilter>> {
  claimAsync(orderId: string, pickerUserId: string): Promise<Order>;
  findQueueAsync(locationId: string): Promise<Order[]>;
  getWithItemsAsync(id: string): Promise<Order | null>;
  searchPagedAsync(filter: PageableFilter<OrderFilter>): Promise<IPageable<Order>>;
  findPackedForDispatchPagedAsync(filter: PageableFilter<OrderFilter>): Promise<IPageable<PackedOrderRow>>;
  findReadyForPickupPagedAsync(filter: PageableFilter<OrderFilter & { locationId?: string }>): Promise<IPageable<PackedOrderRow>>;
  markPickedUpAsync(orderId: string, userId: string): Promise<Order>;
}
