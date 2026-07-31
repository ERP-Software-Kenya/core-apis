import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../../../../infrastructure/persistence/entities';
import { Customer } from '../domain';
import { CreateCustomerRequest, UpdateCustomerRequest, SearchCustomersRequest, CustomerResponse } from '../models';
import { CreateCustomerCommand } from '../commands/create-customer';
import { UpdateCustomerCommand } from '../commands/update-customer';
import { SearchCustomersQuery } from '../queries/search-customers';

@Injectable()
export class CustomerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CustomerEntity, Customer);
      createMap(mapper, Customer, CustomerEntity);
      createMap(mapper, Customer, CustomerResponse);
      createMap(mapper, CreateCustomerRequest, CreateCustomerCommand);
      createMap(mapper, CreateCustomerCommand, Customer);
      createMap(mapper, UpdateCustomerRequest, UpdateCustomerCommand);
      createMap(mapper, UpdateCustomerCommand, Customer);
      createMap(mapper, SearchCustomersRequest, SearchCustomersQuery);
    };
  }
}
