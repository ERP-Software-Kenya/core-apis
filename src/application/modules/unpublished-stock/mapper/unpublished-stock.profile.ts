import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UnpublishedStockEntity, UnpublishedStockMovementEntity } from 'src/infrastructure/persistence/entities';
import { UnpublishedStock, UnpublishedStockMovement } from '../domain';
import { AddUnpublishedStockCommand, PublishUnpublishedStockCommand } from '../commands';
import {
  AddUnpublishedStockRequest,
  PublishUnpublishedStockRequest,
  UnpublishedStockResponse,
  UnpublishedStockMovementResponse,
  ListUnpublishedStockRequest,
} from '../models';
import { UnpublishedStockMovementInput } from 'src/application/shared';
import { ListUnpublishedStockQuery } from '../queries';

@Injectable()
export class UnpublishedStockProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile(): (mapper: Mapper) => void {
    return (mapper: Mapper) => {
      createMap(mapper, UnpublishedStockEntity, UnpublishedStock);
      createMap(mapper, UnpublishedStock, UnpublishedStockEntity);
      createMap(mapper, UnpublishedStockMovementEntity, UnpublishedStockMovement);
      createMap(mapper, UnpublishedStockMovementInput, UnpublishedStockMovementEntity);
      createMap(mapper, UnpublishedStockMovement, UnpublishedStockMovementResponse);
      createMap(mapper, UnpublishedStock, UnpublishedStockResponse);
      createMap(mapper, AddUnpublishedStockRequest, AddUnpublishedStockCommand);
      createMap(mapper, PublishUnpublishedStockRequest, PublishUnpublishedStockCommand);
      createMap(mapper, ListUnpublishedStockRequest, ListUnpublishedStockQuery);
    };
  }
}
