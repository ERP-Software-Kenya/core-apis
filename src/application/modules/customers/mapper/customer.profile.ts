import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../../../../infrastructure/persistence/entities';
import { Customer } from '../domain';
import { CreateCustomerRequest, UpdateCustomerRequest, CustomerResponse } from '../models';
import { CreateCustomerCommand } from '../commands';

@Injectable()
export class CustomerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CustomerEntity, Customer);
      createMap(mapper, Customer, CustomerEntity);
      createMap(mapper, CreateCustomerRequest, CreateCustomerCommand);
      createMap(mapper, Customer, CustomerResponse);
    };
  }
}
