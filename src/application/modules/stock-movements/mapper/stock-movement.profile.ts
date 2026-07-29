import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { StockMovementEntity } from 'src/infrastructure/persistence/entities';
import { StockMovement } from '../domain';
import { StockMovementResponse, StockOperationRequest, AdjustStockRequest } from '../models';
import { AddStockCommand, RemoveStockCommand, AdjustStockCommand, ReserveStockCommand, ReleaseReservationCommand, DamageStockCommand, WriteOffStockCommand } from '../commands';
import { StockMovementInput } from 'src/application/shared';

@Injectable()
export class StockMovementProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile(): (mapper: Mapper) => void {
    return (mapper: Mapper) => {
      createMap(mapper, StockMovementEntity, StockMovement);
      createMap(mapper, StockMovement, StockMovementEntity);
      createMap(mapper, StockMovementInput, StockMovementEntity);
      createMap(mapper, StockMovement, StockMovementResponse);
      createMap(mapper, StockOperationRequest, AddStockCommand);
      createMap(mapper, StockOperationRequest, RemoveStockCommand);
      createMap(mapper, StockOperationRequest, ReserveStockCommand);
      createMap(mapper, StockOperationRequest, ReleaseReservationCommand);
      createMap(mapper, StockOperationRequest, DamageStockCommand);
      createMap(mapper, StockOperationRequest, WriteOffStockCommand);
      createMap(mapper, AdjustStockRequest, AdjustStockCommand);
    };
  }
}
