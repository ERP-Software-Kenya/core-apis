import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { OrganizationEntity } from '../../../../infrastructure/persistence/entities';
import { Organization } from '../domain';
import { CreateOrganizationRequest, OrganizationResponse, SearchOrganizationsRequest, ListOrganizationsRequest, UpdateOrganizationRequest } from '../models';
import { CreateOrganizationCommand, UpdateOrganizationCommand } from '../commands';
import { SearchOrganizationsQuery, ListOrganizationsQuery } from '../queries';

@Injectable()
export class OrganizationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, OrganizationEntity, Organization);
      createMap(mapper, Organization, OrganizationEntity);
      createMap(mapper, CreateOrganizationRequest, CreateOrganizationCommand);
      createMap(mapper, UpdateOrganizationRequest, UpdateOrganizationCommand);
      createMap(mapper, SearchOrganizationsRequest, SearchOrganizationsQuery);
      createMap(mapper, ListOrganizationsRequest, ListOrganizationsQuery);
      createMap(mapper, Organization, OrganizationResponse);
    };
  }
}
