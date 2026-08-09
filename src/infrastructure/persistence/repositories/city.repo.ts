import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { CityEntity } from '../entities';
import { City, CityFilter } from '../../../application/modules/common-utility/domain';
import { ICityRepo } from '../../../application/modules/common-utility/i-city.repo';

@Injectable()
export class CityRepo
  extends BaseRepo<CityEntity, City, number, PageableFilter<CityFilter, number>, Filter<CityFilter, number>>
  implements ICityRepo {
  constructor(
    @InjectRepository(CityEntity) internalRepo: Repository<CityEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(CityRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CityEntity, City);
  }

  public override get idColumnName(): keyof CityEntity {
    return 'id';
  }
}
