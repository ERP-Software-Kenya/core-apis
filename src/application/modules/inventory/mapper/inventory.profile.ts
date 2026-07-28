import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InventoryEntity } from 'src/infrastructure/persistence/entities';
import { Inventory } from '../domain';
import { CreateInventoryCommand, UpdateInventoryCommand } from '../commands';
import { SearchInventoryQuery, ListInventoryQuery } from '../queries';
import { CreateInventoryRequest, InventoryResponse, SearchInventoryRequest, ListInventoryRequest, UpdateInventoryRequest } from '../models';

@Injectable()
export class InventoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, InventoryEntity, Inventory);
      createMap(mapper, Inventory, InventoryEntity);
      createMap(mapper, CreateInventoryCommand, Inventory);
      createMap(mapper, UpdateInventoryCommand, Inventory);
      createMap(mapper, CreateInventoryRequest, CreateInventoryCommand);
      createMap(mapper, UpdateInventoryRequest, UpdateInventoryCommand);
      createMap(mapper, SearchInventoryRequest, SearchInventoryQuery);
      createMap(mapper, ListInventoryRequest, ListInventoryQuery);
      createMap(mapper, Inventory, InventoryResponse);
    };
  }
}
