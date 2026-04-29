import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { PurchaseOrderEntity } from '../entities';
import { PurchaseOrderFilter, PurchaseOrder } from '../../../application/modules/purchase-orders/domain';
import { IPurchaseOrderRepo } from 'src/application/modules/purchase-orders';

@Injectable()
export class PurchaseOrderRepo extends BaseRepo<PurchaseOrderEntity, PurchaseOrder, string, PageableFilter<PurchaseOrderFilter>, Filter<PurchaseOrderFilter>> implements IPurchaseOrderRepo {
  constructor(
    @InjectRepository(PurchaseOrderEntity) internalRepo: Repository<PurchaseOrderEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(PurchaseOrderRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, PurchaseOrderEntity, PurchaseOrder);
  }

  public override get idColumnName(): keyof PurchaseOrderEntity {
    return 'id';
  }
}
