import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { StockTransferEntity } from '../../../../infrastructure/persistence/entities/stock-transfer.entity';
import { StockTransfer } from '../domain';
import { CreateStockTransferRequest, UpdateStockTransferRequest, StockTransferResponse } from '../models';
import { CreateStockTransferCommand } from '../commands';

@Injectable()
export class StockTransferProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, StockTransferEntity, StockTransfer);
      createMap(mapper, StockTransfer, StockTransferEntity);
      createMap(mapper, CreateStockTransferRequest, CreateStockTransferCommand);
      createMap(mapper, StockTransfer, StockTransferResponse);
    };
  }
}
