import { ConflictException, ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ORGANIZATION_INVITATION_REPO } from '../../../../constants';
import { EOrganizationInvitationStatus, ERole } from '../../../../../infrastructure';
import { IOrganizationInvitationRepo } from '../../i-organization-invitation.repo';
import { RevokeInvitationCommand } from './revoke-invitation.command';

@CommandHandlerStrict(RevokeInvitationCommand)
export class RevokeInvitationCommandHandler implements ICommandHandler<RevokeInvitationCommand, void> {
  constructor(
    @Inject(ORGANIZATION_INVITATION_REPO) private readonly repo: IOrganizationInvitationRepo,
    @InjectPinoLogger(RevokeInvitationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RevokeInvitationCommand): Promise<void> {
    this.logger.info(`Executing ${RevokeInvitationCommand.name}`);
    const invitation = await this.repo.getAsync(command.id);
    if (!invitation) throw new NotFoundException('Invitation not found');
    this.assertCanManage(command.currentRoles, command.currentOrganizationId, invitation.organizationId);
    if (invitation.status === EOrganizationInvitationStatus.Accepted) {
      throw new ConflictException('Accepted invitation cannot be revoked');
    }
    await this.repo.updateAsync({
      ...invitation,
      status: EOrganizationInvitationStatus.Revoked,
      revokedAt: new Date(),
      revokedByUserId: command.currentUserId,
    });
  }

  private assertCanManage(roles: ERole[], currentOrgId: string | undefined, targetOrgId: string): void {
    if (!roles.includes(ERole.SuperAdmin) && currentOrgId !== targetOrgId) {
      throw new ForbiddenException('Resource belongs to another organization');
    }
  }
}
