import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { StockMovement } from './domain';

export type StockMovementFilter = Record<string, never>;

export type IStockMovementRepo = IBaseRepo<StockMovement, string, PageableFilter<StockMovementFilter>, Filter<StockMovementFilter>>;
