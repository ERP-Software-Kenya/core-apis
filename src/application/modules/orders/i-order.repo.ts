import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Order } from './domain';

export type OrderFilter = Record<string, never>;

export type IOrderRepo = IBaseRepo<Order, string, PageableFilter<OrderFilter>, Filter<OrderFilter>>;
