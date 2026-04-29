import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { InventoryEntity } from '../entities';
import { InventoryFilter, Inventory } from '../../../application/modules/inventory/domain';
import { IInventoryRepo } from 'src/application/modules/inventory';

@Injectable()
export class InventoryRepo extends BaseRepo<InventoryEntity, Inventory, string, PageableFilter<InventoryFilter>, Filter<InventoryFilter>> implements IInventoryRepo {
  constructor(
    @InjectRepository(InventoryEntity) internalRepo: Repository<InventoryEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(InventoryRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, InventoryEntity, Inventory);
  }

  public override get idColumnName(): keyof InventoryEntity {
    return 'id';
  }
}
