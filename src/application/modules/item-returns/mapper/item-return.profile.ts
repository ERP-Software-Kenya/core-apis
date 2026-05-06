import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ItemReturnEntity } from '../../../../infrastructure/persistence/entities';
import { ItemReturn } from '../domain';
import { CreateItemReturnRequest, SearchItemReturnsRequest, ListItemReturnsRequest, ItemReturnResponse, UpdateItemReturnRequest } from '../models';
import { CreateItemReturnCommand, UpdateItemReturnCommand } from '../commands';
import { SearchItemReturnsQuery, ListItemReturnsQuery } from '../queries';

@Injectable()
export class ItemReturnProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ItemReturnEntity, ItemReturn);
      createMap(mapper, ItemReturn, ItemReturnEntity);
      createMap(mapper, ItemReturn, ItemReturnResponse);
      
      createMap(mapper, CreateItemReturnRequest, CreateItemReturnCommand);
      createMap(mapper, UpdateItemReturnRequest, UpdateItemReturnCommand);
      createMap(mapper, SearchItemReturnsRequest, SearchItemReturnsQuery);
      createMap(mapper, ListItemReturnsRequest, ListItemReturnsQuery);
    };
  }
}
