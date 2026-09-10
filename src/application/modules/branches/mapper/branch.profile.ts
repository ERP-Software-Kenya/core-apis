import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { BranchEntity } from 'src/infrastructure/persistence/entities';
import { Branch } from '../domain';
import { CreateBranchCommand, UpdateBranchCommand } from '../commands';
import { GetBranchQuery, ListBranchesQuery, SearchBranchesQuery } from '../queries';
import { CreateBranchRequest, ListBranchesRequest, SearchBranchesRequest, UpdateBranchRequest, BranchResponse } from '../models';

@Injectable()
export class BranchProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, BranchEntity, Branch);
      createMap(mapper, Branch, BranchEntity);
      createMap(mapper, CreateBranchCommand, Branch);
      createMap(mapper, UpdateBranchCommand, Branch);
      createMap(mapper, CreateBranchRequest, CreateBranchCommand);
      createMap(mapper, UpdateBranchRequest, UpdateBranchCommand);
      createMap(mapper, SearchBranchesRequest, SearchBranchesQuery);
      createMap(mapper, ListBranchesRequest, ListBranchesQuery);
      createMap(mapper, Branch, BranchResponse);
      createMap(mapper, GetBranchQuery, GetBranchQuery);
    };
  }
}
