import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMaintenanceCommand } from './create-maintenance.command';
import { Inject, Logger } from '@nestjs/common';
import { MAINTENANCE_REPO } from '../../../../constants';
import { IMaintenanceRepo } from '../../repositories/i-maintenance.repo';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateMaintenanceRequest } from '../../models';
import { Maintenance } from '../../domain';

@CommandHandler(CreateMaintenanceCommand)
export class CreateMaintenanceHandler implements ICommandHandler<CreateMaintenanceCommand, Maintenance> {
  private readonly logger = new Logger(CreateMaintenanceHandler.name);

  constructor(
    @Inject(MAINTENANCE_REPO) private readonly maintenanceRepo: IMaintenanceRepo,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(command: CreateMaintenanceCommand): Promise<Maintenance> {
    this.logger.log('Executing CreateMaintenanceCommand');
    const maintenance = this.mapper.map(command.request, CreateMaintenanceRequest, Maintenance);
    // Assuming createdBy is handled by auth middleware or should be set here
    maintenance.createdBy = 'system'; // Placeholder
    return await this.maintenanceRepo.createAsync(maintenance);
  }
}
