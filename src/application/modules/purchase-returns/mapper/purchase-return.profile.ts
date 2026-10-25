import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PurchaseReturnEntity, PurchaseReturnItemEntity } from '../../../../infrastructure/persistence/entities';
import { CreatePurchaseReturnCommand, CreatePurchaseReturnItemCommand, UpdatePurchaseReturnCommand } from '../commands';
import { PurchaseReturn, PurchaseReturnItem } from '../domain';
import {
  CreatePurchaseReturnRequest,
  ListPurchaseReturnsRequest,
  PurchaseReturnItemRequest,
  PurchaseReturnItemResponse,
  PurchaseReturnResponse,
  SearchPurchaseReturnsRequest,
  UpdatePurchaseReturnRequest,
} from '../models';
import { ListPurchaseReturnsQuery, SearchPurchaseReturnsQuery } from '../queries';

@Injectable()
export class PurchaseReturnProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, PurchaseReturnEntity, PurchaseReturn);
      createMap(mapper, PurchaseReturn, PurchaseReturnEntity);
      createMap(mapper, PurchaseReturnItemEntity, PurchaseReturnItem);
      createMap(mapper, PurchaseReturnItem, PurchaseReturnItemEntity);
      createMap(mapper, PurchaseReturnItemRequest, CreatePurchaseReturnItemCommand);
      createMap(mapper, CreatePurchaseReturnRequest, CreatePurchaseReturnCommand);
      createMap(mapper, UpdatePurchaseReturnRequest, UpdatePurchaseReturnCommand);
      createMap(mapper, SearchPurchaseReturnsRequest, SearchPurchaseReturnsQuery);
      createMap(mapper, ListPurchaseReturnsRequest, ListPurchaseReturnsQuery);
      createMap(mapper, PurchaseReturnItem, PurchaseReturnItemResponse);
      createMap(mapper, PurchaseReturn, PurchaseReturnResponse);
    };
  }
}
