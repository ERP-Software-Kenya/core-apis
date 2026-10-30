jest.mock('@automapper/classes', () => ({ AutoMap: () => () => undefined }));
jest.mock('../../../../common', () => ({
  CommandHandlerStrict: () => () => undefined,
  CommandBase: class CommandBase {},
}));
jest.mock('../../../../application/constants', () => ({
  LOCATION_REPO: 'LOCATION_REPO',
  ORGANIZATION_INVITATION_REPO: 'ORGANIZATION_INVITATION_REPO',
  ORGANIZATION_REPO: 'ORGANIZATION_REPO',
  ROLE_REPO: 'ROLE_REPO',
  USER_REPO: 'USER_REPO',
}));
jest.mock('../../../../infrastructure', () => ({
  EOrganizationInvitationStatus: {
    Pending: 'pending', Accepted: 'accepted', Expired: 'expired', Revoked: 'revoked', Failed: 'failed',
  },
  ERole: {
    SuperAdmin: 'super_admin', OrgAdmin: 'org_admin', Packer: 'packer', Driver: 'driver', BranchManager: 'branch_manager',
  },
  OrganizationInvitationEntity: class OrganizationInvitationEntity {},
  OrgMemberEntity: class OrgMemberEntity {},
  UserEntity: class UserEntity {},
  UserRoleEntity: class UserRoleEntity {},
  LocationEntity: class LocationEntity {},
  OrganizationEntity: class OrganizationEntity {},
  RoleEntity: class RoleEntity {},
}));
jest.mock('@nestjs/typeorm', () => ({ InjectDataSource: () => () => undefined }));
jest.mock('typeorm', () => ({ DataSource: class DataSource {}, EntityManager: class EntityManager {} }));
jest.mock('../../../../application/modules/locations', () => ({}));
jest.mock('../../../../application/modules/organizations', () => ({}));
jest.mock('../../../../application/modules/roles', () => ({}));
jest.mock('../../../../application/modules/users', () => ({}));
jest.mock(
  '../../../../application/modules/organization-members/organization-invitation-mail.service',
  () => ({ OrganizationInvitationMailService: class OrganizationInvitationMailService {} }),
);
import { ForbiddenException } from '@nestjs/common';
import {
  EOrganizationInvitationStatus, ERole,
  OrganizationInvitationEntity, OrgMemberEntity, UserEntity, UserRoleEntity,
} from '../../../../infrastructure';
import { CreateInvitationCommandHandler } from '../../../../application/modules/organization-members/commands/create-invitation/create-invitation.command-handler';
import { AcceptInvitationCommandHandler } from '../../../../application/modules/organization-members/commands/accept-invitation/accept-invitation.command-handler';
import { CreateInvitationCommand } from '../../../../application/modules/organization-members/commands/create-invitation/create-invitation.command';
import { AcceptInvitationCommand } from '../../../../application/modules/organization-members/commands/accept-invitation/accept-invitation.command';

function makeCreateHandler() {
  const repo = {
    createAsync: jest.fn(), updateAsync: jest.fn(),
    findWithRelationsAsync: jest.fn(), findPendingByOrgAndEmailAsync: jest.fn(),
  };
  const orgRepo = { getAsync: jest.fn() };
  const roleRepo = { getAsync: jest.fn() };
  const locationRepo = { getAsync: jest.fn() };
  const userRepo = { findByEmailAsync: jest.fn() };
  const mail = { sendInvitation: jest.fn().mockResolvedValue(undefined) };
  const config = { get: jest.fn((key: string) => (key === 'ERP_INVITE_WEB_URL' ? 'https://invite.example/invitations' : undefined)) };
  const logger = { info: jest.fn(), error: jest.fn(), warn: jest.fn() };
  const handler = new CreateInvitationCommandHandler(
    repo as never, orgRepo as never, roleRepo as never, locationRepo as never,
    userRepo as never, mail as never, config as never, logger as never,
  );
  return { handler, repo, orgRepo, roleRepo, locationRepo, userRepo, mail };
}

function makeAcceptHandler() {
  const queryBuilder = {
    update: jest.fn().mockReturnThis(), set: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(), andWhere: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValue({}),
  };
  const dataSource = { createQueryBuilder: jest.fn(() => queryBuilder), transaction: jest.fn() };
  const logger = { info: jest.fn(), error: jest.fn(), warn: jest.fn() };
  const handler = new AcceptInvitationCommandHandler(dataSource as never, logger as never);
  return { handler, dataSource };
}

const orgAdminCtx = { currentUserId: 'admin-1', currentOrganizationId: 'org-1', currentRoles: [ERole.OrgAdmin] };

describe('organization-members command handlers', () => {
  describe('CreateInvitationCommandHandler', () => {
    it('always scopes an organization admin invitation to the caller organization', async () => {
      const { handler, repo, orgRepo, roleRepo, userRepo, mail } = makeCreateHandler();
      const org = { id: 'org-1', name: 'Acme' };
      const role = { id: 'role-1', name: 'packer' };
      const saved = {
        id: 'invite-1', organizationId: 'org-1', organizationName: 'Acme',
        email: 'New@Example.com', emailNormalized: 'new@example.com',
        roleId: 'role-1', roleName: 'packer', status: EOrganizationInvitationStatus.Pending,
        expiresAt: new Date(), lastSentAt: new Date(), sendCount: 1, createdAt: new Date(),
      };
      orgRepo.getAsync.mockResolvedValue(org);
      roleRepo.getAsync.mockResolvedValue(role);
      userRepo.findByEmailAsync.mockResolvedValue(null);
      repo.findPendingByOrgAndEmailAsync.mockResolvedValue(null);
      repo.createAsync.mockResolvedValue(saved);
      repo.findWithRelationsAsync.mockResolvedValue(saved);

      const command = Object.assign(new CreateInvitationCommand(), {
        ...orgAdminCtx, email: ' New@Example.com ', roleId: 'role-1', organizationId: 'org-other',
      });
      const result = await handler.execute(command);

      expect(repo.createAsync).toHaveBeenCalledWith(
        expect.objectContaining({ organizationId: 'org-1', emailNormalized: 'new@example.com' }),
      );
      expect(mail.sendInvitation).toHaveBeenCalledWith(
        expect.objectContaining({ organizationName: 'Acme', to: 'New@Example.com' }),
      );
      expect(result.organizationId).toBe('org-1');
    });

    it('rejects a location owned by a different organization', async () => {
      const { handler, repo, orgRepo, roleRepo, locationRepo, userRepo } = makeCreateHandler();
      orgRepo.getAsync.mockResolvedValue({ id: 'org-1', name: 'Acme' });
      roleRepo.getAsync.mockResolvedValue({ id: 'role-1', name: 'packer' });
      locationRepo.getAsync.mockResolvedValue({ id: 'loc-2', organizationId: 'org-2' });
      userRepo.findByEmailAsync.mockResolvedValue(null);
      repo.findPendingByOrgAndEmailAsync.mockResolvedValue(null);

      const command = Object.assign(new CreateInvitationCommand(), {
        ...orgAdminCtx, email: 'new@example.com', roleId: 'role-1', locationId: 'loc-2',
      });
      await expect(handler.execute(command)).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('AcceptInvitationCommandHandler', () => {
    it('accepts a pending invitation atomically and creates local membership', async () => {
      const { handler, dataSource } = makeAcceptHandler();
      const invitation = {
        id: 'invite-1', tokenHash: 'any-hash', organizationId: 'org-1',
        organization: { id: 'org-1', name: 'Acme' }, email: 'new@example.com',
        emailNormalized: 'new@example.com', roleId: 'role-1', role: { name: 'packer' },
        locationId: 'loc-1', invitedByUserId: 'admin-1',
        status: EOrganizationInvitationStatus.Pending,
        expiresAt: new Date(Date.now() + 60_000),
      };
      const manager = {
        findOne: jest.fn(async (entity: unknown) => {
          if (entity === OrganizationInvitationEntity) return invitation;
          return null;
        }),
        create: jest.fn((_entity: unknown, value: unknown) => value),
        save: jest.fn(async (entity: unknown, value: unknown) => {
          if (entity === UserEntity) return { id: 'user-1', ...(value as Record<string, unknown>) };
          if (entity === OrgMemberEntity) return { id: 'member-1', ...(value as Record<string, unknown>) };
          return value;
        }),
      };
      dataSource.transaction.mockImplementation(
        async (callback: (mgr: typeof manager) => Promise<unknown>) => callback(manager),
      );

      const command = Object.assign(new AcceptInvitationCommand(), {
        rawToken: 'raw-token', authenticatedEmail: 'new@example.com', clerkUserId: 'clerk-1',
      });
      const result = await handler.execute(command);

      expect(manager.save).toHaveBeenCalledWith(
        OrgMemberEntity, expect.objectContaining({ organizationId: 'org-1', status: 'active' }),
      );
      expect(manager.save).toHaveBeenCalledWith(
        UserRoleEntity, expect.objectContaining({ roleId: 'role-1', locationId: 'loc-1' }),
      );
      expect(result.membership.id).toBe('member-1');
    });
  });
});
