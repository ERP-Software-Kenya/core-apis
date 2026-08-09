import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { MAINTENANCE_TYPE_REPO } from 'src/application/constants';
import { IMaintenanceTypeRepo } from '../../repositories/i-maintenance-type.repo';
import { MaintenanceType } from '../../domain';
import { ListMaintenanceTypesQuery } from './list-maintenance-types.query';

@QueryHandlerStrict(ListMaintenanceTypesQuery)
export class ListMaintenanceTypesQueryHandler implements IQueryHandler<ListMaintenanceTypesQuery, MaintenanceType[]> {
  public constructor(
    @Inject(MAINTENANCE_TYPE_REPO) private readonly repo: IMaintenanceTypeRepo,
    @InjectPinoLogger(ListMaintenanceTypesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(_query: ListMaintenanceTypesQuery): Promise<MaintenanceType[]> {
    this.logger.info(`Executing Query '${ListMaintenanceTypesQuery.name}'`);
    return this.repo.allAsync();
  }
}
