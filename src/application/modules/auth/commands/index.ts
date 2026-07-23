import { SyncUserCommandHandler } from './sync-user';
import { OnboardOrganizationCommandHandler } from './onboard-organization';
import { InviteMemberCommandHandler } from './invite-member';

export * from './sync-user';
export * from './onboard-organization';
export * from './invite-member';

export const AuthCommandHandlers = [
  SyncUserCommandHandler,
  OnboardOrganizationCommandHandler,
  InviteMemberCommandHandler,
];
