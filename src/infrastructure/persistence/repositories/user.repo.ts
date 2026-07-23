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
export class UserRepo
  extends BaseRepo<UserEntity, User, string, PageableFilter<UserFilter>, Filter<UserFilter>>
  implements IUserRepo
{
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

  public async findByClerkIdAsync(clerkUserId: string): Promise<User | null> {
    const entity = await this.internalRepo.findOne({ where: { clerkUserId } });
    if (!entity) return null;
    return this.mapToModel(entity);
  }

  public async upsertByClerkIdAsync(clerkUserId: string, data: Partial<User>): Promise<User> {
    let entity = await this.internalRepo.findOne({ where: { clerkUserId } });
    if (entity) {
      Object.assign(entity, data);
      entity = await this.internalRepo.save(entity);
    } else {
      entity = this.internalRepo.create({ clerkUserId, ...data } as unknown as UserEntity);
      entity = await this.internalRepo.save(entity);
    }
    return this.mapToModel(entity);
  }
}
