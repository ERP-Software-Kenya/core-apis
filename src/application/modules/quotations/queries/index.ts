export * from './get-quotation/get-quotation.query';
export * from './get-quotation/get-quotation.query-handler';
export * from './search-quotations/search-quotations.query';
export * from './search-quotations/search-quotations.query-handler';
export * from './get-quotation-revisions/get-quotation-revisions.query';
export * from './get-quotation-revisions/get-quotation-revisions.query-handler';

import { GetQuotationQueryHandler } from './get-quotation/get-quotation.query-handler';
import { SearchQuotationsQueryHandler } from './search-quotations/search-quotations.query-handler';
import { GetQuotationRevisionsQueryHandler } from './get-quotation-revisions/get-quotation-revisions.query-handler';

export const QuotationQueryHandlers = [
  GetQuotationQueryHandler,
  SearchQuotationsQueryHandler,
  GetQuotationRevisionsQueryHandler,
];
