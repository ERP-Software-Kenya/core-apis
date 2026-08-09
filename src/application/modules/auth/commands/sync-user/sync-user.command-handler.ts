import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { USER_REPO } from '../../../../constants';
import { User } from '../../../users/domain';
import { IUserRepo } from '../../../users';
import { SyncUserCommand } from './sync-user.command';
import { AuthMailService } from '../../mail';

@CommandHandlerStrict(SyncUserCommand)
export class SyncUserCommandHandler implements ICommandHandler<SyncUserCommand, User> {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    private readonly mailService: AuthMailService,
    @InjectPinoLogger(SyncUserCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: SyncUserCommand): Promise<User> {
    this.logger.info({ clerkUserId: command.clerkUserId }, 'Syncing Clerk user to DB');

    const user = await this.userRepo.upsertByClerkIdAsync(command.clerkUserId, {
      email:     command.email,
      firstName: command.firstName,
      lastName:  command.lastName,
      avatarUrl: command.imageUrl,
      isActive:  true,
    });

    const isNewUser = !user.updatedAt || Math.abs(
      new Date(user.updatedAt).getTime() - new Date(user.createdAt).getTime(),
    ) < 10_000;

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
