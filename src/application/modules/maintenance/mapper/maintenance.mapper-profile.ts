import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateMaintenanceRequest, MaintenanceResponse } from '../models';
import { Maintenance } from '../domain';
import { CreateMaintenanceCommand } from '../commands';
import { MaintenanceEntity } from '../../../../infrastructure/persistence/entities';

@Injectable()
export class MaintenanceProfile extends AutomapperProfile {
  public constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, MaintenanceEntity, Maintenance);
      createMap(mapper, CreateMaintenanceRequest, CreateMaintenanceCommand);
      createMap(mapper, CreateMaintenanceCommand, Maintenance);
      createMap(mapper, CreateMaintenanceRequest, Maintenance);
      createMap(mapper, Maintenance, MaintenanceResponse);
    };
  }
}
