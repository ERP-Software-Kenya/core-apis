import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { USER_REPO } from '../../../../constants';
import { User } from '../../../users/domain';
import { IUserRepo } from '../../../users';
import { SyncUserCommand } from './sync-user.command';

@CommandHandlerStrict(SyncUserCommand)
export class SyncUserCommandHandler implements ICommandHandler<SyncUserCommand, User> {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @InjectPinoLogger(SyncUserCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: SyncUserCommand): Promise<User> {
    this.logger.info({ clerkUserId: command.clerkUserId }, 'Syncing Clerk user to DB');

    const user = await this.userRepo.upsertByClerkIdAsync(command.clerkUserId, {
      email: command.email,
      firstName: command.firstName,
      lastName: command.lastName,
      avatarUrl: command.imageUrl,
      isActive: true,
    });

    return user;
  }
}
