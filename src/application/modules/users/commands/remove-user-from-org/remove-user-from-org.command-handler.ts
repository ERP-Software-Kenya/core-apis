import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { RemoveUserFromOrgCommand } from './remove-user-from-org.command';

@CommandHandlerStrict(RemoveUserFromOrgCommand)
export class RemoveUserFromOrgCommandHandler implements ICommandHandler<RemoveUserFromOrgCommand, void> {
  constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @InjectPinoLogger(RemoveUserFromOrgCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RemoveUserFromOrgCommand): Promise<void> {
    this.logger.info(`Executing ${RemoveUserFromOrgCommand.name} clerkUserId=${command.clerkUserId} orgId=${command.organizationId}`);
    await this.clerkService.removeFromOrganizationAsync({
      clerkUserId:    command.clerkUserId,
      organizationId: command.organizationId,
    });
  }
}
