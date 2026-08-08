import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { UpdateUserRolesCommand } from './update-user-roles.command';

@CommandHandlerStrict(UpdateUserRolesCommand)
export class UpdateUserRolesCommandHandler implements ICommandHandler<UpdateUserRolesCommand, void> {
  constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @InjectPinoLogger(UpdateUserRolesCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateUserRolesCommand): Promise<void> {
    this.logger.info(`Executing ${UpdateUserRolesCommand.name} clerkUserId=${command.clerkUserId}`);
    await this.clerkService.updateUserRolesAsync(command.clerkUserId, command.roles);
  }
}
