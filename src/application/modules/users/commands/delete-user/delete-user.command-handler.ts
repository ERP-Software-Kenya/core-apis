import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { USER_REPO } from '../../../../constants';
import { IUserRepo } from '../..';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandlerStrict(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand, void> {
  constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @InjectPinoLogger(DeleteUserCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteUserCommand): Promise<void> {
    this.logger.info(`Executing ${DeleteUserCommand.name} clerkUserId=${command.clerkUserId}`);
    await this.clerkService.deleteClerkUserAsync(command.clerkUserId);
    const user = await this.userRepo.findByClerkIdAsync(command.clerkUserId);
    if (user) {
      await this.userRepo.deleteAsync(user.id);
    }
  }
}
