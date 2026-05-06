import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { PlatformConfigurationEntity } from '../entities';
import { PlatformConfiguration } from '../../../application/modules/platform-configurations/domain';
import { IPlatformConfigurationRepo, PlatformConfigurationFilter } from '../../../application/modules/platform-configurations';

@Injectable()
export class PlatformConfigurationRepo extends BaseRepo<PlatformConfigurationEntity, PlatformConfiguration, string, PageableFilter<PlatformConfigurationFilter>, Filter<PlatformConfigurationFilter>> implements IPlatformConfigurationRepo {
  constructor(
    @InjectRepository(PlatformConfigurationEntity) internalRepo: Repository<PlatformConfigurationEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(PlatformConfigurationRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, PlatformConfigurationEntity, PlatformConfiguration);
  }

  public override get idColumnName(): keyof PlatformConfigurationEntity {
    return 'id';
  }
}
