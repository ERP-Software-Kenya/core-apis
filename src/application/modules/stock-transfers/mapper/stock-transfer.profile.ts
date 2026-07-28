import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { StockTransferEntity } from '../../../../infrastructure/persistence/entities/stock-transfer.entity';
import { StockTransfer } from '../domain';
import { CreateStockTransferRequest, StockTransferResponse, CompleteStockTransferRequest, CompleteTransferItemRequest } from '../models';
import { CreateStockTransferCommand, CompleteStockTransferCommand, CompleteTransferItemInput } from '../commands';

@Injectable()
export class StockTransferProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, StockTransferEntity, StockTransfer);
      createMap(mapper, StockTransfer, StockTransferEntity);
      createMap(mapper, CreateStockTransferRequest, CreateStockTransferCommand);
      createMap(mapper, StockTransfer, StockTransferResponse);
      createMap(mapper, CompleteTransferItemRequest, CompleteTransferItemInput);
      createMap(
        mapper,
        CompleteStockTransferRequest,
        CompleteStockTransferCommand,
        forMember(
          (dest) => dest.items,
          mapFrom((src) => mapper.mapArray(src.items, CompleteTransferItemRequest, CompleteTransferItemInput)),
        ),
      );
    };
  }
}
