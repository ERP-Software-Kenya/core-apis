import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { VehicleBrandEntity } from '../entities';
import { VehicleBrand } from '../../../application/modules/vehicles/domain';
import { IVehicleBrandRepo } from '../../../application/modules/vehicles/repositories/i-vehicle-brand.repo';

@Injectable()
export class VehicleBrandRepo
  extends BaseRepo<VehicleBrandEntity, VehicleBrand, string>
  implements IVehicleBrandRepo {
  public constructor(
    @InjectRepository(VehicleBrandEntity) internalRepo: Repository<VehicleBrandEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(VehicleBrandRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, VehicleBrandEntity, VehicleBrand);
  }

  public override get idColumnName(): keyof VehicleBrandEntity {
    return 'id';
  }
}
