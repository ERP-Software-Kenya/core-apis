import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { RoleEntity } from '../entities';
import { Role } from '../../../application/modules/roles/domain';
import { IRoleRepo, RoleFilter } from '../../../application/modules/roles';

@Injectable()
export class RoleRepo extends BaseRepo<RoleEntity, Role, string, PageableFilter<RoleFilter>, Filter<RoleFilter>> implements IRoleRepo {
  constructor(
    @InjectRepository(RoleEntity) internalRepo: Repository<RoleEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(RoleRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, RoleEntity, Role);
  }

  public override get idColumnName(): keyof RoleEntity {
    return 'id';
  }
}
