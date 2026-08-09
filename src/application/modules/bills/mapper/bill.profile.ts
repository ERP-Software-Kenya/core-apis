import { createMap, forMember, ignore, Mapper } from '@automapper/core';
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
  TransitionBillStatusRequest,
  UpdateBillItemRequest,
  UpdateBillRequest,
} from '../models';
import { CreateBillCommand, CreateBillItemCommand, UpdateBillCommand } from '../commands';
import { AddBillItemCommand } from '../commands/add-bill-item';
import { UpdateBillItemCommand } from '../commands/update-bill-item';
import { TransitionBillStatusCommand } from '../commands/transition-bill-status';
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
      createMap(mapper, CreateBillCommand, Bill, forMember((dd) => dd.items, ignore()));

      createMap(mapper, UpdateBillRequest, UpdateBillCommand);
      createMap(mapper, UpdateBillCommand, Bill);
      createMap(mapper, AddBillItemCommand, BillItem);
      createMap(mapper, UpdateBillItemRequest, UpdateBillItemCommand);
      createMap(mapper, UpdateBillItemCommand, BillItem);
      createMap(mapper, TransitionBillStatusRequest, TransitionBillStatusCommand);
      createMap(mapper, SearchBillsRequest, SearchBillsQuery);
      createMap(mapper, ListBillsRequest, ListBillsQuery);
    };
  }
}
