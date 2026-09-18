import { IBaseRepo, Filter, IPageable, PageableFilter } from '../../../common';
import { Quotation } from './domain';

export type QuotationFilter = {
  organizationId?: string;
  locationId?: string;
  customerId?: string;
  status?: string;
  isLatest?: boolean;
  search?: string;
};

export interface IQuotationRepo
  extends IBaseRepo<Quotation, string, PageableFilter<QuotationFilter>, Filter<QuotationFilter>> {
  getWithDetailsAsync(id: string): Promise<Quotation | null>;
  searchPagedAsync(filter: PageableFilter<QuotationFilter>): Promise<IPageable<Quotation>>;
  getRevisionsAsync(rootQuotationId: string): Promise<Quotation[]>;
}
