import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { LocationEntity } from 'src/infrastructure/persistence/entities';
import { Location } from '../domain';
import { CreateLocationCommand, UpdateLocationCommand } from '../commands';
import { GetLocationQuery, ListLocationsQuery, SearchLocationsQuery } from '../queries';
import { CreateLocationRequest, ListLocationsRequest, LocationResponse, SearchLocationsRequest, UpdateLocationRequest } from '../models';

@Injectable()
export class LocationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, LocationEntity, Location);
      createMap(mapper, Location, LocationEntity);
      createMap(mapper, CreateLocationCommand, Location);
      createMap(mapper, UpdateLocationCommand, Location);
      createMap(mapper, CreateLocationRequest, CreateLocationCommand);
      createMap(mapper, UpdateLocationRequest, UpdateLocationCommand);
      createMap(mapper, SearchLocationsRequest, SearchLocationsQuery);
      createMap(mapper, ListLocationsRequest, ListLocationsQuery);
      createMap(mapper, Location, LocationResponse);
      createMap(mapper, GetLocationQuery, GetLocationQuery);
    };
  }
}
