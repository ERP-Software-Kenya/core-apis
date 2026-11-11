import { BadRequestException, ConflictException, ForbiddenException, GoneException, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { createHash } from 'crypto';
import { DataSource, EntityManager } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import {
  EOrganizationInvitationStatus, OrgMemberEntity, OrganizationInvitationEntity,
  UserEntity, UserRoleEntity,
} from '../../../../../infrastructure';
import { AcceptInvitationResponse } from '../../models';
import { AcceptInvitationCommand } from './accept-invitation.command';

@CommandHandlerStrict(AcceptInvitationCommand)
export class AcceptInvitationCommandHandler implements ICommandHandler<AcceptInvitationCommand, AcceptInvitationResponse> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(AcceptInvitationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AcceptInvitationCommand): Promise<AcceptInvitationResponse> {
    this.logger.info(`Executing ${AcceptInvitationCommand.name}`);
    const authenticatedEmail = command.authenticatedEmail.trim().toLowerCase();
    if (!authenticatedEmail) throw new BadRequestException('Authenticated account has no verified email');
    const tokenHash = createHash('sha256').update(command.rawToken).digest('hex');
    await this.bulkExpireByToken(tokenHash);
    return this.dataSource.transaction(async (manager) => this.runAcceptance(manager, tokenHash, authenticatedEmail, command));
  }

  private async bulkExpireByToken(tokenHash: string): Promise<void> {
    await this.dataSource.createQueryBuilder()
      .update(OrganizationInvitationEntity)
      .set({ status: EOrganizationInvitationStatus.Expired })
      .where('token_hash = :tokenHash', { tokenHash })
      .andWhere('status = :status', { status: EOrganizationInvitationStatus.Pending })
      .andWhere('expires_at <= NOW()')
      .execute();
  }

  private async runAcceptance(
    manager: EntityManager, tokenHash: string, authenticatedEmail: string, command: AcceptInvitationCommand,
  ): Promise<AcceptInvitationResponse> {
    const invitation = await manager.findOne(OrganizationInvitationEntity, {
      where: { tokenHash }, relations: { organization: true, role: true }, lock: { mode: 'pessimistic_write' },
    });
    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.emailNormalized !== authenticatedEmail) {
      throw new ForbiddenException({ code: 'INVITATION_EMAIL_MISMATCH', message: `Sign in using ${invitation.email} to accept this invitation` });
    }
    let user = await manager.findOne(UserEntity, { where: [{ clerkUserId: command.clerkUserId }, { email: authenticatedEmail }] });
    if (invitation.status === EOrganizationInvitationStatus.Accepted && user && invitation.acceptedByUserId === user.id) {
      const member = await manager.findOneByOrFail(OrgMemberEntity, { userId: user.id, organizationId: invitation.organizationId });
      return this.buildResponse(invitation, member);
    }
    this.assertUsable(invitation);
    if (user?.organizationId && user.organizationId !== invitation.organizationId) {
      throw new ConflictException('User already belongs to another organization');
    }
    user = await this.upsertUser(manager, user, command, authenticatedEmail, invitation.organizationId, invitation);
    const member = await this.upsertMember(manager, user.id, invitation);
    await this.upsertUserRole(manager, user.id, invitation.roleId, invitation.locationId);
    invitation.status = EOrganizationInvitationStatus.Accepted;
    invitation.acceptedAt = new Date();
    invitation.acceptedByUserId = user.id;
    invitation.failureReason = null;
    await manager.save(OrganizationInvitationEntity, invitation);
    return this.buildResponse(invitation, member);
  }

  private async upsertUser(
    manager: EntityManager, existing: UserEntity | null, command: AcceptInvitationCommand,
    email: string, organizationId: string, invitation: OrganizationInvitationEntity,
  ): Promise<UserEntity> {
    if (!existing) {
      const user = manager.create(UserEntity, {
        clerkUserId: command.clerkUserId, email, firstName: command.firstName ?? invitation.firstName,
        lastName: command.lastName ?? invitation.lastName, avatarUrl: command.imageUrl,
        isActive: true, organizationId,
      });
      return manager.save(UserEntity, user);
    }
    existing.clerkUserId = command.clerkUserId;
    existing.organizationId = organizationId;
    existing.isActive = true;
    existing.firstName = command.firstName ?? existing.firstName ?? invitation.firstName;
    existing.lastName = command.lastName ?? existing.lastName ?? invitation.lastName;
    return manager.save(UserEntity, existing);
  }

  private async upsertMember(manager: EntityManager, userId: string, invitation: OrganizationInvitationEntity): Promise<OrgMemberEntity> {
    let member = await manager.findOne(OrgMemberEntity, { where: { userId, organizationId: invitation.organizationId } });
    if (!member) {
      member = manager.create(OrgMemberEntity, {
        organizationId: invitation.organizationId, userId, roleId: invitation.roleId,
        invitedById: invitation.invitedByUserId, status: 'active', joinedAt: new Date(),
      });
    } else {
      member.roleId = invitation.roleId;
      member.status = 'active';
    }
    return manager.save(OrgMemberEntity, member);
  }

  private async upsertUserRole(manager: EntityManager, userId: string, roleId: string, locationId: string | undefined): Promise<void> {
    let userRole = await manager.findOne(UserRoleEntity, { where: { userId } });
    if (!userRole) {
      userRole = manager.create(UserRoleEntity, { userId, roleId, locationId });
    } else {
      userRole.roleId = roleId;
      userRole.locationId = locationId;
    }
    await manager.save(UserRoleEntity, userRole);
  }

  private assertUsable(invitation: OrganizationInvitationEntity): void {
    if (invitation.status === EOrganizationInvitationStatus.Expired) {
      throw new GoneException({ code: 'INVITATION_EXPIRED', message: 'Invitation has expired' });
    }
    if (invitation.status === EOrganizationInvitationStatus.Revoked) {
      throw new GoneException({ code: 'INVITATION_REVOKED', message: 'Invitation was revoked' });
    }
    if (invitation.status === EOrganizationInvitationStatus.Failed) {
      throw new ConflictException({ code: 'INVITATION_DELIVERY_FAILED', message: 'Invitation delivery failed; request a resend' });
    }
    if (invitation.status !== EOrganizationInvitationStatus.Pending && invitation.status !== EOrganizationInvitationStatus.Accepted) {
      throw new ConflictException({ code: 'INVITATION_UNAVAILABLE', message: 'Invitation is not available' });
    }
  }

  private buildResponse(invitation: OrganizationInvitationEntity, member: OrgMemberEntity): AcceptInvitationResponse {
    const response = new AcceptInvitationResponse();
    response.organization = { id: invitation.organizationId, name: invitation.organization.name };
    response.membership = {
      id: member.id, status: member.status, role: invitation.role.name,
      locationIds: invitation.locationId ? [invitation.locationId] : [],
    };
    return response;
  }
}
