import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { FuelTypeEntity } from '../entities';
import { FuelType } from '../../../application/modules/vehicles/domain';
import { IFuelTypeRepo } from '../../../application/modules/vehicles/repositories/i-fuel-type.repo';

@Injectable()
export class FuelTypeRepo
  extends BaseRepo<FuelTypeEntity, FuelType, string>
  implements IFuelTypeRepo {
  public constructor(
    @InjectRepository(FuelTypeEntity) internalRepo: Repository<FuelTypeEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(FuelTypeRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, FuelTypeEntity, FuelType);
  }

  public override get idColumnName(): keyof FuelTypeEntity {
    return 'id';
  }
}
