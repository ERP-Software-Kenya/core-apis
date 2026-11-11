import { ConflictException, ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { createHash, randomBytes } from 'crypto';
import { CommandHandlerStrict } from '../../../../../common';
import { ORGANIZATION_INVITATION_REPO } from '../../../../constants';
import { EOrganizationInvitationStatus, ERole } from '../../../../../infrastructure';
import { IOrganizationInvitationRepo } from '../../i-organization-invitation.repo';
import { OrganizationInvitation } from '../../domain';
import { OrganizationInvitationMailService } from '../../organization-invitation-mail.service';
import { OrganizationInvitationResponse } from '../../models';
import { ResendInvitationCommand } from './resend-invitation.command';

@CommandHandlerStrict(ResendInvitationCommand)
export class ResendInvitationCommandHandler implements ICommandHandler<ResendInvitationCommand, OrganizationInvitationResponse> {
  constructor(
    @Inject(ORGANIZATION_INVITATION_REPO) private readonly repo: IOrganizationInvitationRepo,
    private readonly mail: OrganizationInvitationMailService,
    private readonly config: ConfigService,
    @InjectPinoLogger(ResendInvitationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ResendInvitationCommand): Promise<OrganizationInvitationResponse> {
    this.logger.info(`Executing ${ResendInvitationCommand.name}`);
    const invitation = await this.repo.findWithRelationsAsync(command.id);
    if (!invitation) throw new NotFoundException('Invitation not found');
    this.assertCanManage(command.currentRoles, command.currentOrganizationId, invitation.organizationId);
    if (invitation.status === EOrganizationInvitationStatus.Accepted || invitation.status === EOrganizationInvitationStatus.Revoked) {
      throw new ConflictException('Invitation cannot be resent');
    }
    const { raw, hash } = this.makeToken();
    const now = new Date();
    const parsed = parseInt(this.config.get<string>('ERP_INVITE_EXPIRY_HOURS') ?? '72', 10);
    const hours = isNaN(parsed) || parsed <= 0 ? 72 : parsed;
    const updated = await this.repo.updateAsync({
      ...invitation, tokenHash: hash, status: EOrganizationInvitationStatus.Pending,
      expiresAt: new Date(now.getTime() + hours * 3_600_000), lastSentAt: now,
      sendCount: invitation.sendCount + 1, failureReason: null,
    });
    try {
      await this.sendEmail(updated, raw);
    } catch (err) {
      await this.repo.updateAsync({
        ...updated, status: EOrganizationInvitationStatus.Failed,
        failureReason: err instanceof Error ? err.message : 'Mail delivery failed',
      });
      throw err;
    }
    const full = await this.repo.findWithRelationsAsync(updated.id);
    return this.toResponse(full ?? updated);
  }

  private assertCanManage(roles: ERole[], currentOrgId: string | undefined, targetOrgId: string): void {
    if (!roles.includes(ERole.SuperAdmin) && currentOrgId !== targetOrgId) {
      throw new ForbiddenException('Resource belongs to another organization');
    }
  }

  private makeToken(): { raw: string; hash: string } {
    const raw = randomBytes(32).toString('base64url');
    return { raw, hash: createHash('sha256').update(raw).digest('hex') };
  }

  private async sendEmail(invitation: OrganizationInvitation, raw: string): Promise<void> {
    const base = (this.config.get<string>('ERP_INVITE_WEB_URL') ?? 'http://localhost:5173/invitations').replace(/\/$/, '');
    await this.mail.sendInvitation({
      to: invitation.email, organizationName: invitation.organizationName,
      roleName: invitation.roleName, inviteUrl: `${base}/${encodeURIComponent(raw)}`,
      expiresAt: invitation.expiresAt,
    });
  }

  private toResponse(inv: OrganizationInvitation): OrganizationInvitationResponse {
    const r = new OrganizationInvitationResponse();
    r.id = inv.id; r.email = inv.email; r.firstName = inv.firstName; r.lastName = inv.lastName;
    r.organizationId = inv.organizationId; r.organizationName = inv.organizationName;
    r.roleId = inv.roleId; r.roleName = inv.roleName; r.locationId = inv.locationId;
    r.locationName = inv.locationName; r.status = inv.status; r.expiresAt = inv.expiresAt;
    r.lastSentAt = inv.lastSentAt; r.sendCount = inv.sendCount; r.createdAt = inv.createdAt;
    return r;
  }
}
