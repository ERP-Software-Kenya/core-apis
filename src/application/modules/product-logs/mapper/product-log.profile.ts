import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ProductLogEntity } from 'src/infrastructure/persistence/entities';
import { ProductLog } from '../domain';
import { ProductLogEntry } from 'src/application/shared';
import { ProductLogResponse } from '../models';

@Injectable()
export class ProductLogProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ProductLogEntity, ProductLog);
      createMap(mapper, ProductLog, ProductLogEntity);
      createMap(mapper, ProductLogEntry, ProductLog);
      createMap(mapper, ProductLog, ProductLogResponse);
    };
  }
}
