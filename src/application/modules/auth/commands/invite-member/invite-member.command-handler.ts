import { Inject, ConflictException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { USER_REPO, ORG_MEMBER_REPO } from '../../../../constants';
import { IUserRepo } from '../../../users';
import { IOrgMemberRepo } from '../../i-org-member.repo';
import { OrgMember } from '../../domain';
import { InviteMemberCommand } from './invite-member.command';

@CommandHandlerStrict(InviteMemberCommand)
export class InviteMemberCommandHandler implements ICommandHandler<InviteMemberCommand, OrgMember> {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @Inject(ORG_MEMBER_REPO) private readonly orgMemberRepo: IOrgMemberRepo,
    @InjectPinoLogger(InviteMemberCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: InviteMemberCommand): Promise<OrgMember> {
    this.logger.info({ email: command.email, organizationId: command.organizationId }, 'Inviting member');

    // Resolve the invitee — they must already be synced to the DB
    const invitee = await this.userRepo.findOneAsync({ email: command.email });
    if (!invitee) {
      throw new ConflictException(
        `No user found with email "${command.email}". The user must sign up via Clerk first.`,
      );
    }

    const existing = await this.orgMemberRepo.findByUserAndOrgAsync(invitee.id, command.organizationId);
    if (existing) {
      throw new ConflictException('User is already a member of this organization');
    }

    const membership = await this.orgMemberRepo.createAsync({
      organizationId: command.organizationId,
      userId: invitee.id,
      roleId: command.roleId,
      invitedById: command.invitedByUserId,
      status: 'invited',
      joinedAt: null,
    } as unknown as OrgMember);

    return membership;
  }
}
