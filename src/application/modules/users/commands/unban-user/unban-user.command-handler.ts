import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { USER_REPO } from '../../../../constants';
import { IUserRepo } from '../..';
import { UnbanUserCommand } from './unban-user.command';

@CommandHandlerStrict(UnbanUserCommand)
export class UnbanUserCommandHandler implements ICommandHandler<UnbanUserCommand, void> {
  constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @InjectPinoLogger(UnbanUserCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UnbanUserCommand): Promise<void> {
    this.logger.info(`Executing ${UnbanUserCommand.name} clerkUserId=${command.clerkUserId}`);
    await this.clerkService.unbanClerkUserAsync(command.clerkUserId);
    const user = await this.userRepo.findByClerkIdAsync(command.clerkUserId);
    if (user) {
      user.isActive = true;
      await this.userRepo.updateAsync(user);
    }
  }
}
