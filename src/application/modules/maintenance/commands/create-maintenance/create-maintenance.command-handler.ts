import { ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { MAINTENANCE_REPO } from 'src/application/constants';
import { IMaintenanceRepo } from '../../repositories/i-maintenance.repo';
import { Maintenance } from '../../domain';
import { CreateMaintenanceCommand } from './create-maintenance.command';

@CommandHandlerStrict(CreateMaintenanceCommand)
export class CreateMaintenanceHandler implements ICommandHandler<CreateMaintenanceCommand, Maintenance> {
  public constructor(
    @Inject(MAINTENANCE_REPO) private readonly maintenanceRepo: IMaintenanceRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateMaintenanceHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateMaintenanceCommand): Promise<Maintenance> {
    this.logger.info(`Executing Command '${CreateMaintenanceCommand.name}'`);
    const maintenance = this.mapper.map(command, CreateMaintenanceCommand, Maintenance);
    return this.maintenanceRepo.createAsync(maintenance);
  }
}
