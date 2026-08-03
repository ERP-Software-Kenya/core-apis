import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { AssignUserToOrgCommand } from './assign-user-to-org.command';

@CommandHandlerStrict(AssignUserToOrgCommand)
export class AssignUserToOrgCommandHandler implements ICommandHandler<AssignUserToOrgCommand, void> {
  constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @InjectPinoLogger(AssignUserToOrgCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AssignUserToOrgCommand): Promise<void> {
    this.logger.info(`Executing ${AssignUserToOrgCommand.name} clerkUserId=${command.clerkUserId} orgId=${command.organizationId}`);
    await this.clerkService.assignToOrganizationAsync({
      clerkUserId:    command.clerkUserId,
      organizationId: command.organizationId,
      role:           command.role,
    });
  }
}
