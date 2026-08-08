import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { InviteUserCommand } from './invite-user.command';

@CommandHandlerStrict(InviteUserCommand)
export class InviteUserCommandHandler implements ICommandHandler<InviteUserCommand, void> {
  constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @InjectPinoLogger(InviteUserCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: InviteUserCommand): Promise<void> {
    this.logger.info(`Executing ${InviteUserCommand.name} email=${command.email}`);
    await this.clerkService.inviteUserAsync({
      email:       command.email,
      roles:       command.roles,
      redirectUrl: command.redirectUrl,
    });
  }
}
