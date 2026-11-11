export * from './create-invitation';
export * from './resend-invitation';
export * from './revoke-invitation';
export * from './accept-invitation';
export * from './update-member';
export * from './remove-member';

import { CreateInvitationCommandHandler } from './create-invitation';
import { ResendInvitationCommandHandler } from './resend-invitation';
import { RevokeInvitationCommandHandler } from './revoke-invitation';
import { AcceptInvitationCommandHandler } from './accept-invitation';
import { UpdateMemberCommandHandler } from './update-member';
import { RemoveMemberCommandHandler } from './remove-member';

export const OrganizationMembersCommandHandlers = [
  CreateInvitationCommandHandler,
  ResendInvitationCommandHandler,
  RevokeInvitationCommandHandler,
  AcceptInvitationCommandHandler,
  UpdateMemberCommandHandler,
  RemoveMemberCommandHandler,
];
