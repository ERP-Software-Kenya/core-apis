import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateVehicleRequest, UpdateVehicleRequest, SearchVehiclesRequest, ListVehiclesRequest, VehicleResponse } from '../models';
import { Vehicle } from '../domain';
import { CreateVehicleCommand, UpdateVehicleCommand } from '../commands';
import { SearchVehiclesQuery } from '../queries/search-vehicles/search-vehicles.query';
import { ListVehiclesQuery } from '../queries/list-vehicles/list-vehicles.query';

@Injectable()
export class VehicleProfile extends AutomapperProfile {
  public constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateVehicleRequest, CreateVehicleCommand);
      createMap(mapper, CreateVehicleCommand, Vehicle);
      createMap(mapper, UpdateVehicleRequest, UpdateVehicleCommand);
      createMap(mapper, UpdateVehicleCommand, Vehicle);
      createMap(mapper, SearchVehiclesRequest, SearchVehiclesQuery);
      createMap(mapper, ListVehiclesRequest, ListVehiclesQuery);
      createMap(mapper, Vehicle, VehicleResponse);
    };
  }
}
