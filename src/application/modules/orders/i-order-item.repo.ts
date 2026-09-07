import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { OrderItem, OrderItemFilter } from './domain';

export interface IOrderItemRepo extends IBaseRepo<OrderItem, string, PageableFilter<OrderItemFilter>, Filter<OrderItemFilter>> {}
