import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { StockMovementEntity } from '../entities';
import { StockMovement } from '../../../application/modules/stock-movements/domain';
import { IStockMovementRepo, StockMovementFilter } from '../../../application/modules/stock-movements';

@Injectable()
export class StockMovementRepo extends BaseRepo<StockMovementEntity, StockMovement, string, PageableFilter<StockMovementFilter>, Filter<StockMovementFilter>> implements IStockMovementRepo {
  constructor(
    @InjectRepository(StockMovementEntity) internalRepo: Repository<StockMovementEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(StockMovementRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, StockMovementEntity, StockMovement);
  }

  public override get idColumnName(): keyof StockMovementEntity {
    return 'id';
  }
}
