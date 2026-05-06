import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { ActivityLogEntity } from '../entities';
import { ActivityLog } from '../../../application/modules/activity-logs/domain';
import { IActivityLogRepo, ActivityLogFilter } from '../../../application/modules/activity-logs';

@Injectable()
export class ActivityLogRepo extends BaseRepo<ActivityLogEntity, ActivityLog, string, PageableFilter<ActivityLogFilter>, Filter<ActivityLogFilter>> implements IActivityLogRepo {
  constructor(
    @InjectRepository(ActivityLogEntity) internalRepo: Repository<ActivityLogEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(ActivityLogRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, ActivityLogEntity, ActivityLog);
  }

  public override get idColumnName(): keyof ActivityLogEntity {
    return 'id';
  }
}
