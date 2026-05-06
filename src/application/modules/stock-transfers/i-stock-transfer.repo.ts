import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { StockTransfer } from './domain';

export type StockTransferFilter = Record<string, never>;

export type IStockTransferRepo = IBaseRepo<StockTransfer, string, PageableFilter<StockTransferFilter>, Filter<StockTransferFilter>>;
