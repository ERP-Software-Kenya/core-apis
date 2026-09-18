import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { QuotationItem, QuotationItemFilter } from './domain';

export type IQuotationItemRepo = IBaseRepo<
  QuotationItem,
  string,
  PageableFilter<QuotationItemFilter>,
  Filter<QuotationItemFilter>
>;
