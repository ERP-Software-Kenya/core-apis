import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { ORG_MEMBER_REPO, USER_REPO, USER_ROLE_REPO } from '../../../../constants';
import { IUserRepo } from '../..';
import { IOrgMemberRepo } from '../../../auth/i-org-member.repo';
import { IUserRoleRepo } from '../../../user-roles/i-user-role.repo';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandlerStrict(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand, void> {
  constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @Inject(ORG_MEMBER_REPO) private readonly orgMemberRepo: IOrgMemberRepo,
    @Inject(USER_ROLE_REPO) private readonly userRoleRepo: IUserRoleRepo,
    @InjectPinoLogger(DeleteUserCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteUserCommand): Promise<void> {
    this.logger.info(`Executing ${DeleteUserCommand.name} clerkUserId=${command.clerkUserId}`);
    await this.clerkService.deleteClerkUserAsync(command.clerkUserId);
    const user = await this.userRepo.findByClerkIdAsync(command.clerkUserId);
    if (!user) return;

    const [orgMembers, userRoles] = await Promise.all([
      this.orgMemberRepo.findByUserIdAsync(user.id),
      this.userRoleRepo.findByUserIdAsync(user.id),
    ]);
    await Promise.all([
      ...orgMembers.map(m => this.orgMemberRepo.deleteAsync(m.id)),
      ...userRoles.map(r => this.userRoleRepo.deleteAsync(r.id)),
    ]);

    await this.userRepo.deleteAsync(user.id);
  }
}
