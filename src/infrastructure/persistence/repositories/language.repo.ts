import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { LanguageEntity } from '../entities';
import { Language, LanguageFilter } from '../../../application/modules/common-utility/domain';
import { ILanguageRepo } from '../../../application/modules/common-utility/i-language.repo';

@Injectable()
export class LanguageRepo
  extends BaseRepo<LanguageEntity, Language, number, PageableFilter<LanguageFilter, number>, Filter<LanguageFilter, number>>
  implements ILanguageRepo {
  constructor(
    @InjectRepository(LanguageEntity) internalRepo: Repository<LanguageEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(LanguageRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, LanguageEntity, Language);
  }

  public override get idColumnName(): keyof LanguageEntity {
    return 'id';
  }
}
