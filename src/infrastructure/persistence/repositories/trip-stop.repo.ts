import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { TripStopEntity } from '../entities';

@Injectable()
export class TripStopRepo extends BaseRepo<TripStopEntity, TripStopEntity, string, PageableFilter<TripStopEntity>, Filter<TripStopEntity>> {
  public constructor(
    @InjectRepository(TripStopEntity) internalRepo: Repository<TripStopEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(TripStopRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, TripStopEntity, TripStopEntity);
  }

  public override get idColumnName(): keyof TripStopEntity {
    return 'id';
  }
}
