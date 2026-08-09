import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { BillEntity, BillItemEntity } from '../../../../infrastructure/persistence/entities';
import { Bill, BillItem } from '../domain';
import {
  BillItemResponse,
  BillResponse,
  CreateBillItemRequest,
  CreateBillRequest,
  ListBillsRequest,
  SearchBillsRequest,
  UpdateBillRequest,
} from '../models';
import { CreateBillCommand, CreateBillItemCommand, UpdateBillCommand } from '../commands';
import { ListBillsQuery, SearchBillsQuery } from '../queries';

@Injectable()
export class BillProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, BillItemEntity, BillItem);
      createMap(mapper, BillItem, BillItemEntity);
      createMap(mapper, BillEntity, Bill);
      createMap(mapper, Bill, BillEntity);

      createMap(mapper, BillItem, BillItemResponse);
      createMap(mapper, Bill, BillResponse);

      createMap(mapper, CreateBillItemRequest, CreateBillItemCommand);
      createMap(mapper, CreateBillRequest, CreateBillCommand);
      createMap(mapper, CreateBillItemCommand, BillItem);
      createMap(mapper, CreateBillCommand, Bill);

      createMap(mapper, UpdateBillRequest, UpdateBillCommand);
      createMap(mapper, SearchBillsRequest, SearchBillsQuery);
      createMap(mapper, ListBillsRequest, ListBillsQuery);
    };
  }
}
