import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { LocationEntity } from '../entities';
import { Location, LocationFilter } from '../../../application/modules/locations/domain';
import { ILocationRepo } from 'src/application/modules/locations';

@Injectable()
export class LocationRepo
  extends BaseRepo<LocationEntity, Location, string, PageableFilter<LocationFilter>, Filter<LocationFilter>>
  implements ILocationRepo
{
  constructor(
    @InjectRepository(LocationEntity) internalRepo: Repository<LocationEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(LocationRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, LocationEntity, Location);
  }

  public override get idColumnName(): keyof LocationEntity {
    return 'id';
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }
}
