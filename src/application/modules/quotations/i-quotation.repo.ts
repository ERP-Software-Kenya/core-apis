import { IBaseRepo, Filter, IPageable, PageableFilter } from '../../../common';
import { Quotation } from './domain';
import { CalculatedQuotationTotals } from './helpers';
import { EFulfillmentMode } from '../../shared/enums/e-fulfillment-mode';

export type QuotationFilter = {
  organizationId?: string;
  locationId?: string;
  customerId?: string;
  status?: string;
  isLatest?: boolean;
  search?: string;
  accessibleLocationIds?: string[];
};

export type CreateQuotationRecord = {
  organizationId: string;
  locationId: string;
  customerId: string;
  notes?: string;
  createdByUserId?: string;
  totals: CalculatedQuotationTotals;
};

export type UpdateQuotationRecord = {
  id: string;
  organizationId: string;
  locationId?: string;
  customerId?: string;
  notes?: string;
  totals?: CalculatedQuotationTotals;
};

export type ConvertQuotationRecord = {
  id: string;
  organizationId: string;
  fulfillmentMode: EFulfillmentMode;
  fulfillmentLocationId?: string;
};

export interface IQuotationRepo
  extends IBaseRepo<Quotation, string, PageableFilter<QuotationFilter>, Filter<QuotationFilter>> {
  getWithDetailsAsync(id: string): Promise<Quotation | null>;
  searchPagedAsync(filter: PageableFilter<QuotationFilter>): Promise<IPageable<Quotation>>;
  getRevisionsAsync(rootQuotationId: string): Promise<Quotation[]>;
  createWithItemsAsync(input: CreateQuotationRecord): Promise<Quotation>;
  updateWithItemsAsync(input: UpdateQuotationRecord): Promise<Quotation>;
  reviseAsync(id: string, organizationId: string, createdByUserId?: string): Promise<Quotation>;
  convertToOrderAsync(input: ConvertQuotationRecord): Promise<string>;
  markSentIfDraftAsync(id: string, organizationId: string): Promise<Quotation>;
}
