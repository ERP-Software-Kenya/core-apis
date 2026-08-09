export * from './get-user';
export * from './list-users';
export * from './search-users';
export * from './get-user-roles';
export * from './list-invitations';

import { GetUserQueryHandler }            from './get-user';
import { ListUsersQueryHandler }          from './list-users';
import { SearchUsersQueryHandler }        from './search-users';
import { GetUserRolesQueryHandler }       from './get-user-roles';
import { ListInvitationsQueryHandler }    from './list-invitations';

export const UserQueryHandlers = [
  GetUserQueryHandler,
  ListUsersQueryHandler,
  SearchUsersQueryHandler,
  GetUserRolesQueryHandler,
  ListInvitationsQueryHandler,
];
