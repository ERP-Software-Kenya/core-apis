import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { MaintenanceTypeEntity } from '../entities';
import { MaintenanceType } from '../../../application/modules/maintenance/domain';
import { IMaintenanceTypeRepo } from '../../../application/modules/maintenance/repositories/i-maintenance-type.repo';

@Injectable()
export class MaintenanceTypeRepo
  extends BaseRepo<MaintenanceTypeEntity, MaintenanceType, string>
  implements IMaintenanceTypeRepo {
  public constructor(
    @InjectRepository(MaintenanceTypeEntity) internalRepo: Repository<MaintenanceTypeEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(MaintenanceTypeRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, MaintenanceTypeEntity, MaintenanceType);
  }

  public override get idColumnName(): keyof MaintenanceTypeEntity {
    return 'id';
  }
}
