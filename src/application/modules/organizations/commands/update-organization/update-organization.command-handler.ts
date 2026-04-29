import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ORGANIZATION_REPO } from '../../../../constants';
import { Organization } from '../../domain';
import { IOrganizationRepo } from '../..';
import { UpdateOrganizationCommand } from './update-organization.command';

@CommandHandlerStrict(UpdateOrganizationCommand)
export class UpdateOrganizationCommandHandler implements ICommandHandler<UpdateOrganizationCommand, Organization> {
  constructor(
    @Inject(ORGANIZATION_REPO) private readonly repo: IOrganizationRepo,
    @InjectPinoLogger(UpdateOrganizationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateOrganizationCommand): Promise<Organization> {
    this.logger.info(`Executing ${UpdateOrganizationCommand.name} id=${command.id}`);
    const entity = await this.repo.getAsync(command.id);
    if(command.name) entity.name = command.name;
    return this.repo.updateAsync(entity);
  }
}
