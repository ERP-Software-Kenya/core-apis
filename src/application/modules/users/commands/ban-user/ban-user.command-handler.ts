import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { USER_REPO } from '../../../../constants';
import { IUserRepo } from '../..';
import { BanUserCommand } from './ban-user.command';

@CommandHandlerStrict(BanUserCommand)
export class BanUserCommandHandler implements ICommandHandler<BanUserCommand, void> {
  constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @InjectPinoLogger(BanUserCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: BanUserCommand): Promise<void> {
    this.logger.info(`Executing ${BanUserCommand.name} clerkUserId=${command.clerkUserId}`);
    await this.clerkService.banClerkUserAsync(command.clerkUserId);
    const user = await this.userRepo.findByClerkIdAsync(command.clerkUserId);
    if (user) {
      user.isActive = false;
      await this.userRepo.updateAsync(user);
    }
  }
}
