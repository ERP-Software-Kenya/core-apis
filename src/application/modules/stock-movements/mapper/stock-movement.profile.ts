import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { StockMovement } from '../domain';
import { CreateStockMovementRequest, StockMovementResponse } from '../models';
import { CreateStockMovementCommand } from '../commands';
import { StockMovementEntity } from 'src/infrastructure';

@Injectable()
export class StockMovementProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, StockMovementEntity, StockMovement);
      createMap(mapper, StockMovement, StockMovementEntity);
      createMap(mapper, CreateStockMovementRequest, CreateStockMovementCommand);
      createMap(mapper, StockMovement, StockMovementResponse);
    };
  }
}
