// Standard barrel file
export * from './create-organization';
export * from './delete-organization';
export * from './update-organization';

import { CreateOrganizationCommandHandler } from './create-organization';
import { DeleteOrganizationCommandHandler } from './delete-organization';
import { UpdateOrganizationCommandHandler } from './update-organization';

export const OrganizationCommandHandlers = [
  CreateOrganizationCommandHandler,
  DeleteOrganizationCommandHandler,
  UpdateOrganizationCommandHandler,
];
