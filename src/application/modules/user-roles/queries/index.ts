export * from './get-user-role';
export * from './list-user-roles';

import { GetUserRoleQueryHandler }    from './get-user-role';
import { ListUserRolesQueryHandler }  from './list-user-roles';

export const UserRoleQueryHandlers = [GetUserRoleQueryHandler, ListUserRolesQueryHandler];
