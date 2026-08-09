export * from './create-user';
export * from './invite-user';
export * from './revoke-invitation';
export * from './update-user-roles';
export * from './ban-user';
export * from './unban-user';
export * from './delete-user';
export * from './assign-user-to-org';
export * from './remove-user-from-org';

import { CreateUserCommandHandler }           from './create-user';
import { InviteUserCommandHandler }           from './invite-user';
import { RevokeInvitationCommandHandler }     from './revoke-invitation';
import { UpdateUserRolesCommandHandler }      from './update-user-roles';
import { BanUserCommandHandler }              from './ban-user';
import { UnbanUserCommandHandler }            from './unban-user';
import { DeleteUserCommandHandler }           from './delete-user';
import { AssignUserToOrgCommandHandler }      from './assign-user-to-org';
import { RemoveUserFromOrgCommandHandler }    from './remove-user-from-org';

export const UserCommandHandlers = [
  CreateUserCommandHandler,
  InviteUserCommandHandler,
  RevokeInvitationCommandHandler,
  UpdateUserRolesCommandHandler,
  BanUserCommandHandler,
  UnbanUserCommandHandler,
  DeleteUserCommandHandler,
  AssignUserToOrgCommandHandler,
  RemoveUserFromOrgCommandHandler,
];
