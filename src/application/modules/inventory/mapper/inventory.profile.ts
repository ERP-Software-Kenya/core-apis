import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InventoryEntity } from '../../../../infrastructure/persistence/entities';
import { Inventory } from '../domain';
import { CreateInventoryRequest, InventoryResponse, SearchInventoryRequest, ListInventoryRequest, UpdateInventoryRequest } from '../models';
import { CreateInventoryCommand, UpdateInventoryCommand } from '../commands';
import { SearchInventoryQuery, ListInventoryQuery } from '../queries';

@Injectable()
export class InventoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, InventoryEntity, Inventory);
      createMap(mapper, Inventory, InventoryEntity);
      createMap(mapper, CreateInventoryRequest, CreateInventoryCommand);
      createMap(mapper, UpdateInventoryRequest, UpdateInventoryCommand);
      createMap(mapper, SearchInventoryRequest, SearchInventoryQuery);
      createMap(mapper, ListInventoryRequest, ListInventoryQuery);
      createMap(mapper, Inventory, InventoryResponse);
    };
  }
}
