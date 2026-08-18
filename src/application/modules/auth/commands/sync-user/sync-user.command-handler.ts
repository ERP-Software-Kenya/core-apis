import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { USER_REPO, USER_ROLE_REPO, ORG_MEMBER_REPO } from '../../../../constants';
import { User } from '../../../users/domain';
import { IUserRepo } from '../../../users';
import { UserRole } from '../../../user-roles/domain';
import { IUserRoleRepo } from '../../../user-roles';
import { IOrgMemberRepo } from '../../i-org-member.repo';
import { OrgMember } from '../../domain';
import { SyncUserCommand } from './sync-user.command';
import { AuthMailService } from '../../mail';

@CommandHandlerStrict(SyncUserCommand)
export class SyncUserCommandHandler implements ICommandHandler<SyncUserCommand, User> {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @Inject(USER_ROLE_REPO) private readonly userRoleRepo: IUserRoleRepo,
    @Inject(ORG_MEMBER_REPO) private readonly orgMemberRepo: IOrgMemberRepo,
    private readonly mailService: AuthMailService,
    @InjectPinoLogger(SyncUserCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: SyncUserCommand): Promise<User> {
    this.logger.info({ clerkUserId: command.clerkUserId }, 'Syncing Clerk user to DB');

    let user = await this.userRepo.upsertByClerkIdAsync(command.clerkUserId, {
      email:     command.email,
      firstName: command.firstName,
      lastName:  command.lastName,
      avatarUrl: command.imageUrl,
      isActive:  true,
    });

    const isNewUser = !user.updatedAt || Math.abs(
      new Date(user.updatedAt).getTime() - new Date(user.createdAt).getTime(),
    ) < 10_000;

    if (!user.organizationId && command.organizationId && command.roleId) {
      this.logger.info({ userId: user.id, organizationId: command.organizationId }, 'Applying invite: linking org and role');
      user = await this.userRepo.updateAsync({ ...user, organizationId: command.organizationId });
      const userRole = new UserRole();
      userRole.userId = user.id;
      userRole.roleId = command.roleId;
      userRole.locationId = command.locationId;
      await this.userRoleRepo.createAsync(userRole);
      await this.orgMemberRepo.createAsync({
        organizationId: command.organizationId,
        userId: user.id,
        roleId: command.roleId,
        status: 'active',
        joinedAt: new Date(),
      } as unknown as OrgMember);
    }

    if (isNewUser && command.email) {
      this.mailService.sendTemplatedAsync(command.email, 'welcome', {
        firstName: command.firstName ?? 'there',
        email:     command.email,
      }).catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Welcome mail failed — non-fatal'),
      );
    }

    return user;
  }
}
