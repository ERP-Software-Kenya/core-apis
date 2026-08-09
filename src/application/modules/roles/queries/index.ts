export * from './get-role';
export * from './list-roles';

import { GetRoleQueryHandler }   from './get-role';
import { ListRolesQueryHandler } from './list-roles';

export const RoleQueryHandlers = [GetRoleQueryHandler, ListRolesQueryHandler];
