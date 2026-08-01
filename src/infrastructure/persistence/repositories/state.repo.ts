import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { StateEntity } from '../entities';
import { State, StateFilter } from '../../../application/modules/common-utility/domain';
import { IStateRepo } from '../../../application/modules/common-utility/i-state.repo';

@Injectable()
export class StateRepo
  extends BaseRepo<StateEntity, State, number, PageableFilter<StateFilter, number>, Filter<StateFilter, number>>
  implements IStateRepo {
  constructor(
    @InjectRepository(StateEntity) internalRepo: Repository<StateEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(StateRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, StateEntity, State);
  }

  public override get idColumnName(): keyof StateEntity {
    return 'id';
  }
}
