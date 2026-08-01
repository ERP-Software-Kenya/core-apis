import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { CountryEntity } from '../entities';
import { Country, CountryFilter } from '../../../application/modules/common-utility/domain';
import { ICountryRepo } from '../../../application/modules/common-utility/i-country.repo';

@Injectable()
export class CountryRepo
  extends BaseRepo<CountryEntity, Country, number, PageableFilter<CountryFilter, number>, Filter<CountryFilter, number>>
  implements ICountryRepo {
  constructor(
    @InjectRepository(CountryEntity) internalRepo: Repository<CountryEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(CountryRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CountryEntity, Country);
  }

  public override get idColumnName(): keyof CountryEntity {
    return 'id';
  }
}
