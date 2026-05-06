import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { PurchaseItem } from './domain';

export type PurchaseItemFilter = Record<string, never>;

export type IPurchaseItemRepo = IBaseRepo<PurchaseItem, string, PageableFilter<PurchaseItemFilter>, Filter<PurchaseItemFilter>>;
