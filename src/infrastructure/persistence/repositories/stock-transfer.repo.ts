import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { StockTransferEntity } from '../entities';
import { StockTransfer } from '../../../application/modules/stock-transfers/domain';
import { IStockTransferRepo, StockTransferFilter } from '../../../application/modules/stock-transfers';

@Injectable()
export class StockTransferRepo extends BaseRepo<StockTransferEntity, StockTransfer, string, PageableFilter<StockTransferFilter>, Filter<StockTransferFilter>> implements IStockTransferRepo {
  constructor(
    @InjectRepository(StockTransferEntity) internalRepo: Repository<StockTransferEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(StockTransferRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, StockTransferEntity, StockTransfer);
  }

  public override get idColumnName(): keyof StockTransferEntity {
    return 'id';
  }
}
