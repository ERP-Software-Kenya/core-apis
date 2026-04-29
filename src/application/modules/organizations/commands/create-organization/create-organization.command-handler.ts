import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ORGANIZATION_REPO } from '../../../../constants';
import { Organization } from '../../domain';
import { IOrganizationRepo } from '../..';
import { CreateOrganizationCommand } from './create-organization.command';

@CommandHandlerStrict(CreateOrganizationCommand)
export class CreateOrganizationCommandHandler implements ICommandHandler<CreateOrganizationCommand, Organization> {
  constructor(
    @Inject(ORGANIZATION_REPO) private readonly repo: IOrganizationRepo,
    @InjectPinoLogger(CreateOrganizationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateOrganizationCommand): Promise<Organization> {
    this.logger.info(`Executing ${CreateOrganizationCommand.name}`);
    return this.repo.createAsync({ name: command.name } as Organization);
  }
}
