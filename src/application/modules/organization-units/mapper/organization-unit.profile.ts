import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { OrganizationUnitEntity } from '../../../../infrastructure/persistence/entities';
import { OrganizationUnit } from '../domain';
import {
  CreateOrganizationUnitRequest,
  UpdateOrganizationUnitRequest,
  ListOrganizationUnitsRequest,
  OrganizationUnitResponse,
} from '../models';
import { CreateOrganizationUnitCommand, UpdateOrganizationUnitCommand } from '../commands';
import { ListOrganizationUnitsQuery } from '../queries';

@Injectable()
export class OrganizationUnitProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, OrganizationUnitEntity, OrganizationUnit);
      createMap(mapper, OrganizationUnit, OrganizationUnitEntity);
      createMap(mapper, CreateOrganizationUnitRequest, CreateOrganizationUnitCommand);
      createMap(mapper, CreateOrganizationUnitCommand, OrganizationUnit);
      createMap(mapper, UpdateOrganizationUnitRequest, UpdateOrganizationUnitCommand);
      createMap(mapper, UpdateOrganizationUnitCommand, OrganizationUnit);
      createMap(mapper, ListOrganizationUnitsRequest, ListOrganizationUnitsQuery);
      createMap(mapper, OrganizationUnit, OrganizationUnitResponse);
    };
  }
}
