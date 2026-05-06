import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../../infrastructure/persistence/entities/user.entity';
import { User } from '../domain';
import { CreateUserRequest, UpdateUserRequest, UserResponse } from '../models';
import { CreateUserCommand } from '../commands';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, UserEntity, User);
      createMap(mapper, User, UserEntity);
      createMap(mapper, CreateUserRequest, CreateUserCommand);
      createMap(mapper, User, UserResponse);
    };
  }
}
