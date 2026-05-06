import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { PurchaseItemEntity } from '../entities';
import { PurchaseItem } from '../../../application/modules/purchase-items/domain';
import { IPurchaseItemRepo, PurchaseItemFilter } from '../../../application/modules/purchase-items';

@Injectable()
export class PurchaseItemRepo extends BaseRepo<PurchaseItemEntity, PurchaseItem, string, PageableFilter<PurchaseItemFilter>, Filter<PurchaseItemFilter>> implements IPurchaseItemRepo {
  constructor(
    @InjectRepository(PurchaseItemEntity) internalRepo: Repository<PurchaseItemEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(PurchaseItemRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, PurchaseItemEntity, PurchaseItem);
  }

  public override get idColumnName(): keyof PurchaseItemEntity {
    return 'id';
  }
}
