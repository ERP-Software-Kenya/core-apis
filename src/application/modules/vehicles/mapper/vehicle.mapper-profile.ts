import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import {
  CreateVehicleRequest, UpdateVehicleRequest, SearchVehiclesRequest, ListVehiclesRequest,
  VehicleResponse, VehicleTypeResponse, VehicleBrandResponse, FuelTypeResponse,
  ListVehicleTypesRequest, ListVehicleBrandsRequest, ListFuelTypesRequest,
} from '../models';
import { Vehicle, VehicleType, VehicleBrand, FuelType } from '../domain';
import { CreateVehicleCommand, UpdateVehicleCommand } from '../commands';
import {
  SearchVehiclesQuery, ListVehiclesQuery,
  ListVehicleTypesQuery, ListVehicleBrandsQuery, ListFuelTypesQuery,
} from '../queries';
import {
  VehicleEntity, VehicleTypeEntity, VehicleBrandEntity, FuelTypeEntity,
} from '../../../../infrastructure/persistence/entities';

@Injectable()
export class VehicleProfile extends AutomapperProfile {
  public constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, VehicleEntity, Vehicle);
      createMap(mapper, CreateVehicleRequest, CreateVehicleCommand);
      createMap(mapper, CreateVehicleCommand, Vehicle);
      createMap(mapper, UpdateVehicleRequest, UpdateVehicleCommand);
      createMap(mapper, UpdateVehicleCommand, Vehicle);
      createMap(mapper, SearchVehiclesRequest, SearchVehiclesQuery);
      createMap(mapper, ListVehiclesRequest, ListVehiclesQuery);
      createMap(mapper, Vehicle, VehicleResponse);
      createMap(mapper, VehicleTypeEntity, VehicleType);
      createMap(mapper, VehicleType, VehicleTypeResponse);
      createMap(mapper, VehicleBrandEntity, VehicleBrand);
      createMap(mapper, VehicleBrand, VehicleBrandResponse);
      createMap(mapper, FuelTypeEntity, FuelType);
      createMap(mapper, FuelType, FuelTypeResponse);
      createMap(mapper, ListVehicleTypesRequest, ListVehicleTypesQuery);
      createMap(mapper, ListVehicleBrandsRequest, ListVehicleBrandsQuery);
      createMap(mapper, ListFuelTypesRequest, ListFuelTypesQuery);
    };
  }
}
