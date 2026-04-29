import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ORGANIZATION_REPO } from '../../../../constants';
import { IOrganizationRepo } from '../..';
import { DeleteOrganizationCommand } from './delete-organization.command';

@CommandHandlerStrict(DeleteOrganizationCommand)
export class DeleteOrganizationCommandHandler implements ICommandHandler<DeleteOrganizationCommand, boolean> {
  constructor(
    @Inject(ORGANIZATION_REPO) private readonly repo: IOrganizationRepo,
    @InjectPinoLogger(DeleteOrganizationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteOrganizationCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteOrganizationCommand.name} id=${command.id}`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
