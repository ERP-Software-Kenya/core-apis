export * from './get-customer';
export * from './search-customers';

import { GetCustomerQueryHandler } from './get-customer';
import { SearchCustomersQueryHandler } from './search-customers';

export const CustomerQueryHandlers = [
  GetCustomerQueryHandler,
  SearchCustomersQueryHandler,
];
