import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { BillEntity } from '../../../../infrastructure/persistence/entities';
import { Bill } from '../domain';
import { CreateBillRequest, SearchBillsRequest, ListBillsRequest, BillResponse, UpdateBillRequest } from '../models';
import { CreateBillCommand, UpdateBillCommand } from '../commands';
import { SearchBillsQuery, ListBillsQuery } from '../queries';

@Injectable()
export class BillProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, BillEntity, Bill);
      createMap(mapper, Bill, BillEntity);
      createMap(mapper, Bill, BillResponse);
      
      createMap(mapper, CreateBillRequest, CreateBillCommand);
      createMap(mapper, UpdateBillRequest, UpdateBillCommand);
      createMap(mapper, SearchBillsRequest, SearchBillsQuery);
      createMap(mapper, ListBillsRequest, ListBillsQuery);
    };
  }
}
