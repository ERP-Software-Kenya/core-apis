import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateMaintenanceRequest, MaintenanceResponse, MaintenanceTypeResponse, ListMaintenanceTypesRequest } from '../models';
import { Maintenance, MaintenanceType } from '../domain';
import { CreateMaintenanceCommand } from '../commands';
import { MaintenanceEntity, MaintenanceTypeEntity } from '../../../../infrastructure/persistence/entities';
import { ListMaintenanceTypesQuery } from '../queries';

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
      createMap(mapper, MaintenanceTypeEntity, MaintenanceType);
      createMap(mapper, MaintenanceType, MaintenanceTypeResponse);
      createMap(mapper, ListMaintenanceTypesRequest, ListMaintenanceTypesQuery);
    };
  }
}
