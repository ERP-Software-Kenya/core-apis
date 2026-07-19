import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateTripRequest, CreateTripResponse, UpdateTripRequest } from '../models';
import { UpdateTripCommand } from '../commands';
import { Trip } from '../domain';


@Injectable()
export class TripProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateTripRequest, Trip);
      createMap(mapper, UpdateTripRequest, UpdateTripCommand);
      createMap(mapper, Trip, CreateTripResponse);
    };
  }
}
