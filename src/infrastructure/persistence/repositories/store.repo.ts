import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { StoreEntity } from '../entities';
import { Store, StoreFilter } from '../../../application/modules/stores/domain';
import { IStoreRepo } from 'src/application/modules/stores';

@Injectable()
export class StoreRepo extends BaseRepo<StoreEntity, Store, string, PageableFilter<StoreFilter>, Filter<StoreFilter>> implements IStoreRepo {
  constructor(
    @InjectRepository(StoreEntity) internalRepo: Repository<StoreEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(StoreRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, StoreEntity, Store);
  }

  public override get idColumnName(): keyof StoreEntity {
    return 'id';
  }
}
