import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateVehicleRequest, UpdateVehicleRequest, VehicleResponse } from '../models';
import { Vehicle } from '../domain';
import { UpdateVehicleCommand } from '../commands';

@Injectable()
export class VehicleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateVehicleRequest, Vehicle);
      createMap(mapper, UpdateVehicleRequest, UpdateVehicleCommand);
      createMap(mapper, Vehicle, VehicleResponse);
    };
  }
}
