import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { VehicleTypeEntity } from '../entities';
import { VehicleType } from '../../../application/modules/vehicles/domain';
import { IVehicleTypeRepo } from '../../../application/modules/vehicles/repositories/i-vehicle-type.repo';

@Injectable()
export class VehicleTypeRepo
  extends BaseRepo<VehicleTypeEntity, VehicleType, string>
  implements IVehicleTypeRepo {
  public constructor(
    @InjectRepository(VehicleTypeEntity) internalRepo: Repository<VehicleTypeEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(VehicleTypeRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, VehicleTypeEntity, VehicleType);
  }

  public override get idColumnName(): keyof VehicleTypeEntity {
    return 'id';
  }
}
