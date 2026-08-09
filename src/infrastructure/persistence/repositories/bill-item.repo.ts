import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { BillItemEntity } from '../entities';
import { BillItem, BillItemFilter } from '../../../application/modules/bills/domain';
import { IBillItemRepo } from '../../../application/modules/bills/i-bill-item.repo';

@Injectable()
export class BillItemRepo extends BaseRepo<BillItemEntity, BillItem, string, PageableFilter<BillItemFilter>, Filter<BillItemFilter>> implements IBillItemRepo {
  constructor(
    @InjectRepository(BillItemEntity) internalRepo: Repository<BillItemEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(BillItemRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, BillItemEntity, BillItem);
  }

  public override get idColumnName(): keyof BillItemEntity {
    return 'id';
  }
}
