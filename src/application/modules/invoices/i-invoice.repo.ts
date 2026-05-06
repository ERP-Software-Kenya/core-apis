import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Invoice } from './domain';

export type InvoiceFilter = Record<string, never>;

export type IInvoiceRepo = IBaseRepo<Invoice, string, PageableFilter<InvoiceFilter>, Filter<InvoiceFilter>>;
