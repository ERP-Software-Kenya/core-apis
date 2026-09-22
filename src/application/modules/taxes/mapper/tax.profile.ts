import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { TaxEntity } from '../../../../infrastructure/persistence/entities';
import { Tax } from '../domain';
import { CreateTaxRequest, UpdateTaxRequest, SearchTaxesRequest, ListTaxesRequest } from '../models';
import { TaxResponse } from '../models';
import { CreateTaxCommand, UpdateTaxCommand } from '../commands';
import { SearchTaxesQuery, ListTaxesQuery } from '../queries';

@Injectable()
export class TaxProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, TaxEntity, Tax);
      createMap(mapper, Tax, TaxEntity);
      createMap(mapper, Tax, TaxResponse);
      createMap(mapper, CreateTaxRequest, CreateTaxCommand);
      createMap(mapper, CreateTaxCommand, Tax);
      createMap(mapper, UpdateTaxRequest, UpdateTaxCommand);
      createMap(mapper, UpdateTaxCommand, Tax);
      createMap(mapper, SearchTaxesRequest, SearchTaxesQuery);
      createMap(mapper, ListTaxesRequest, ListTaxesQuery);
    };
  }
}
