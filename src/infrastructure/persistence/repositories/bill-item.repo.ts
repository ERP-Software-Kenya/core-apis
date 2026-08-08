import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { BillItemEntity } from '../entities';
import { BillItem } from '../../../application/modules/bills/domain';

@Injectable()
export class BillItemRepo extends BaseRepo<BillItemEntity, BillItem, string, PageableFilter<BillItem>, Filter<BillItem>> {
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
