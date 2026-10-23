export * from './get-organization-unit';
export * from './list-organization-units';

import { GetOrganizationUnitQueryHandler } from './get-organization-unit';
import { ListOrganizationUnitsQueryHandler } from './list-organization-units';

export const OrganizationUnitQueryHandlers = [
  GetOrganizationUnitQueryHandler,
  ListOrganizationUnitsQueryHandler,
];
