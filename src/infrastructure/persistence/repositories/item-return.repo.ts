import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { ItemReturnEntity } from '../entities';
import { ItemReturn } from '../../../application/modules/item-returns/domain';
import { IItemReturnRepo, ItemReturnFilter } from '../../../application/modules/item-returns';

@Injectable()
export class ItemReturnRepo extends BaseRepo<ItemReturnEntity, ItemReturn, string, PageableFilter<ItemReturnFilter>, Filter<ItemReturnFilter>> implements IItemReturnRepo {
  constructor(
    @InjectRepository(ItemReturnEntity) internalRepo: Repository<ItemReturnEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(ItemReturnRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, ItemReturnEntity, ItemReturn);
  }

  public override get idColumnName(): keyof ItemReturnEntity {
    return 'id';
  }
}
