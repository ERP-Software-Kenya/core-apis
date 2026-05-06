import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { UserEntity } from '../entities';
import { User } from '../../../application/modules/users/domain';
import { IUserRepo, UserFilter } from '../../../application/modules/users';

@Injectable()
export class UserRepo extends BaseRepo<UserEntity, User, string, PageableFilter<UserFilter>, Filter<UserFilter>> implements IUserRepo {
  constructor(
    @InjectRepository(UserEntity) internalRepo: Repository<UserEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(UserRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, UserEntity, User);
  }

  public override get idColumnName(): keyof UserEntity {
    return 'id';
  }
}
