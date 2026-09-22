export * from './get-tax';
export * from './list-taxes';
export * from './search-taxes';

import { GetTaxQueryHandler } from './get-tax';
import { ListTaxesQueryHandler } from './list-taxes';
import { SearchTaxesQueryHandler } from './search-taxes';

export const TaxQueryHandlers = [
  GetTaxQueryHandler,
  ListTaxesQueryHandler,
  SearchTaxesQueryHandler,
];
