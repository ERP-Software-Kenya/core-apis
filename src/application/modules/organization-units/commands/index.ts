export * from './create-organization-unit';
export * from './update-organization-unit';
export * from './delete-organization-unit';

import { CreateOrganizationUnitCommandHandler } from './create-organization-unit';
import { UpdateOrganizationUnitCommandHandler } from './update-organization-unit';
import { DeleteOrganizationUnitCommandHandler } from './delete-organization-unit';

export const OrganizationUnitCommandHandlers = [
  CreateOrganizationUnitCommandHandler,
  UpdateOrganizationUnitCommandHandler,
  DeleteOrganizationUnitCommandHandler,
];
