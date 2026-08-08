import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { BillEntity, BillItemEntity } from '../../../../infrastructure/persistence/entities';
import { Bill, BillItem } from '../domain';
import {
  CreateBillRequest,
  UpdateBillRequest,
  SearchBillsRequest,
  ListBillsRequest,
  CreateBillItemRequest,
  UpdateBillItemRequest,
  TransitionBillStatusRequest,
  BillResponse,
  BillItemResponse,
} from '../models';
import { CreateBillCommand } from '../commands/create-bill';
import { UpdateBillCommand } from '../commands/update-bill';
import { AddBillItemCommand } from '../commands/add-bill-item';
import { UpdateBillItemCommand } from '../commands/update-bill-item';
import { TransitionBillStatusCommand } from '../commands/transition-bill-status';
import { SearchBillsQuery } from '../queries/search-bills/search-bills.query';
import { ListBillsQuery } from '../queries/list-bills/list-bills.query';

@Injectable()
export class BillProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      // Entity ↔ Domain
      createMap(mapper, BillEntity, Bill);
      createMap(mapper, Bill, BillEntity);
      createMap(mapper, BillItemEntity, BillItem);
      createMap(mapper, BillItem, BillItemEntity);

      // Domain → Response
      createMap(mapper, Bill, BillResponse);
      createMap(mapper, BillItem, BillItemResponse);

      // Command → Domain (for handlers)
      createMap(mapper, CreateBillCommand, Bill, forMember((d) => d.items, ignore()));
      createMap(mapper, UpdateBillCommand, Bill);
      createMap(mapper, AddBillItemCommand, BillItem);
      createMap(mapper, UpdateBillItemCommand, BillItem);

      // Request → Command (controller layer)
      createMap(mapper, CreateBillRequest, CreateBillCommand);
      createMap(mapper, CreateBillItemRequest, AddBillItemCommand);
      createMap(mapper, UpdateBillRequest, UpdateBillCommand);
      createMap(mapper, UpdateBillItemRequest, UpdateBillItemCommand);
      createMap(mapper, TransitionBillStatusRequest, TransitionBillStatusCommand);
      createMap(mapper, SearchBillsRequest, SearchBillsQuery);
      createMap(mapper, ListBillsRequest, ListBillsQuery);
    };
  }
}
