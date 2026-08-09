import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { CommissionPayableEntity } from '../entities';
import { CommissionPayable } from '../../../application/modules/credit-approvals/domain';
import {
  CommissionPayableFilter,
  ICommissionPayableRepo,
} from '../../../application/modules/credit-approvals/i-commission-payable.repo';

@Injectable()
export class CommissionPayableRepo
  extends BaseRepo<
    CommissionPayableEntity,
    CommissionPayable,
    string,
    PageableFilter<CommissionPayableFilter>,
    Filter<CommissionPayableFilter>
  >
  implements ICommissionPayableRepo
{
  constructor(
    @InjectRepository(CommissionPayableEntity) internalRepo: Repository<CommissionPayableEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(CommissionPayableRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CommissionPayableEntity, CommissionPayable);
  }

  public override get idColumnName(): keyof CommissionPayableEntity {
    return 'id';
  }
}
