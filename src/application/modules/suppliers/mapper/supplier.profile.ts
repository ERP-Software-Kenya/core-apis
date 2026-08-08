import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { SupplierEntity } from '../../../../infrastructure/persistence/entities';
import { Supplier } from '../domain';
import { CreateSupplierRequest, SupplierResponse, UpdateSupplierRequest, ListSuppliersRequest, SearchSuppliersRequest } from '../models';
import { CreateSupplierCommand, UpdateSupplierCommand } from '../commands';
import { ListSuppliersQuery, SearchSuppliersQuery } from '../queries';

@Injectable()
export class SupplierProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, SupplierEntity, Supplier);
      createMap(mapper, Supplier, SupplierEntity);
      createMap(mapper, CreateSupplierRequest, CreateSupplierCommand);
      createMap(mapper, CreateSupplierCommand, Supplier);
      createMap(mapper, UpdateSupplierRequest, UpdateSupplierCommand);
      createMap(mapper, UpdateSupplierCommand, Supplier);
      createMap(mapper, ListSuppliersRequest, ListSuppliersQuery);
      createMap(mapper, SearchSuppliersRequest, SearchSuppliersQuery);
      createMap(mapper, Supplier, SupplierResponse);
    };
  }
}
