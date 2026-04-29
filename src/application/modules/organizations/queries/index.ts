// Standard barrel file
export * from './get-organization';
export * from './list-organizations';
export * from './search-organizations';

import { GetOrganizationQueryHandler } from './get-organization';
import { ListOrganizationsQueryHandler } from './list-organizations';
import { SearchOrganizationsQueryHandler } from './search-organizations';

export const OrganizationQueryHandlers = [
  GetOrganizationQueryHandler,
  ListOrganizationsQueryHandler,
  SearchOrganizationsQueryHandler,
];
