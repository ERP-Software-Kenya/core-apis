import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { SalesReturnEntity, SalesReturnItemEntity } from '../../../../infrastructure/persistence/entities';
import { SalesReturn, SalesReturnItem } from '../domain';
import { CreateSalesReturnCommand, CreateSalesReturnItemCommand, UpdateSalesReturnCommand } from '../commands';
import { CreateSalesReturnRequest, ListSalesReturnsRequest, SalesReturnItemRequest, SalesReturnItemResponse, SalesReturnResponse, SearchSalesReturnsRequest, UpdateSalesReturnRequest } from '../models';
import { ListSalesReturnsQuery, SearchSalesReturnsQuery } from '../queries';

@Injectable()
export class SalesReturnProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, SalesReturnEntity, SalesReturn);
      createMap(mapper, SalesReturn, SalesReturnEntity);
      createMap(mapper, SalesReturnItemEntity, SalesReturnItem);
      createMap(mapper, SalesReturnItem, SalesReturnItemEntity);
      createMap(mapper, SalesReturnItemRequest, CreateSalesReturnItemCommand);
      createMap(mapper, CreateSalesReturnRequest, CreateSalesReturnCommand);
      createMap(mapper, UpdateSalesReturnRequest, UpdateSalesReturnCommand);
      createMap(mapper, SearchSalesReturnsRequest, SearchSalesReturnsQuery);
      createMap(mapper, ListSalesReturnsRequest, ListSalesReturnsQuery);
      createMap(mapper, SalesReturnItem, SalesReturnItemResponse);
      createMap(mapper, SalesReturn, SalesReturnResponse);
    };
  }
}
