import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { RevokeInvitationCommand } from './revoke-invitation.command';

@CommandHandlerStrict(RevokeInvitationCommand)
export class RevokeInvitationCommandHandler implements ICommandHandler<RevokeInvitationCommand, void> {
  public constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @InjectPinoLogger(RevokeInvitationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RevokeInvitationCommand): Promise<void> {
    this.logger.info(`Executing ${RevokeInvitationCommand.name} invitationId=${command.invitationId}`);
    await this.clerkService.revokeInvitationAsync(command.invitationId);
  }
}
