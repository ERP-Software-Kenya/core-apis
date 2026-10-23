import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ORGANIZATION_UNIT_REPO } from '../../../../constants';
import { OrganizationUnit } from '../../domain';
import { IOrganizationUnitRepo } from '../../i-organization-unit.repo';
import { CreateOrganizationUnitCommand } from './create-organization-unit.command';

@CommandHandlerStrict(CreateOrganizationUnitCommand)
export class CreateOrganizationUnitCommandHandler implements ICommandHandler<CreateOrganizationUnitCommand, OrganizationUnit> {
  constructor(
    @Inject(ORGANIZATION_UNIT_REPO) private readonly repo: IOrganizationUnitRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateOrganizationUnitCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateOrganizationUnitCommand): Promise<OrganizationUnit> {
    this.logger.info(`Executing ${CreateOrganizationUnitCommand.name}`);
    const unit = this.mapper.map(command, CreateOrganizationUnitCommand, OrganizationUnit);
    return this.repo.createAsync(unit);
  }
}
