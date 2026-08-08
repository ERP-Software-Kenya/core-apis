import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateVehicleExpenseRequest, VehicleExpenseResponse } from '../models';
import { VehicleExpense } from '../domain';
import { CreateVehicleExpenseCommand } from '../commands';
import { VehicleExpenseEntity } from '../../../../infrastructure/persistence/entities';

@Injectable()
export class VehicleExpenseProfile extends AutomapperProfile {
  public constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, VehicleExpenseEntity, VehicleExpense);
      createMap(mapper, CreateVehicleExpenseRequest, CreateVehicleExpenseCommand);
      createMap(mapper, CreateVehicleExpenseCommand, VehicleExpense);
      createMap(mapper, VehicleExpense, VehicleExpenseResponse);
    };
  }
}
