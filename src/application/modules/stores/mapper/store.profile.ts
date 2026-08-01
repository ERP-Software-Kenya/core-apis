import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { StoreEntity } from '../../../../infrastructure/persistence/entities';
import { Store } from '../domain';
import { CreateStoreCommand } from '../commands';
import { SearchStoresQuery } from '../queries';
import { CreateStoreRequest, ListStoresRequest, SearchStoresRequest, StoreResponse, UpdateStoreRequest } from '../models';
import { UpdateStoreCommand } from '../commands';
import { ListStoresQuery } from '../queries';

@Injectable()
export class StoreProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, StoreEntity, Store);
      createMap(mapper, Store, StoreEntity);
      createMap(mapper, CreateStoreRequest, CreateStoreCommand);
      createMap(mapper, CreateStoreCommand, Store);
      createMap(mapper, UpdateStoreRequest, UpdateStoreCommand);
      createMap(mapper, UpdateStoreCommand, Store);
      createMap(mapper, SearchStoresRequest, SearchStoresQuery);
      createMap(mapper, ListStoresRequest, ListStoresQuery);
      createMap(mapper, Store, StoreResponse);
    };
  }
}
