import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateMaintenanceRequest, MaintenanceResponse } from '../models';
import { Maintenance } from '../domain';

@Injectable()
export class MaintenanceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateMaintenanceRequest, Maintenance);
      createMap(mapper, Maintenance, MaintenanceResponse);
    };
  }
}
