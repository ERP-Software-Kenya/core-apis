import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { UserDeviceTokenEntity } from '../entities';

@Injectable()
export class UserDeviceTokenRepo extends BaseRepo<UserDeviceTokenEntity, UserDeviceTokenEntity, string, PageableFilter<UserDeviceTokenEntity>, Filter<UserDeviceTokenEntity>> {
  public constructor(
    @InjectRepository(UserDeviceTokenEntity) internalRepo: Repository<UserDeviceTokenEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(UserDeviceTokenRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, UserDeviceTokenEntity, UserDeviceTokenEntity);
  }

  public override get idColumnName(): keyof UserDeviceTokenEntity {
    return 'id';
  }
}
