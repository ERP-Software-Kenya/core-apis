import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { CurrencyEntity } from '../entities';
import { Currency, CurrencyFilter } from '../../../application/modules/common-utility/domain';
import { ICurrencyRepo } from '../../../application/modules/common-utility/i-currency.repo';

@Injectable()
export class CurrencyRepo
  extends BaseRepo<CurrencyEntity, Currency, number, PageableFilter<CurrencyFilter, number>, Filter<CurrencyFilter, number>>
  implements ICurrencyRepo {
  constructor(
    @InjectRepository(CurrencyEntity) internalRepo: Repository<CurrencyEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(CurrencyRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CurrencyEntity, Currency);
  }

  public override get idColumnName(): keyof CurrencyEntity {
    return 'id';
  }
}
