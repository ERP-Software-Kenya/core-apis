import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { CreditApprovalRequestEntity } from '../entities';
import { CreditApprovalRequest } from '../../../application/modules/credit-approvals/domain';
import {
  CreditApprovalRequestFilter,
  ICreditApprovalRequestRepo,
} from '../../../application/modules/credit-approvals/i-credit-approval-request.repo';

@Injectable()
export class CreditApprovalRequestRepo
  extends BaseRepo<
    CreditApprovalRequestEntity,
    CreditApprovalRequest,
    string,
    PageableFilter<CreditApprovalRequestFilter>,
    Filter<CreditApprovalRequestFilter>
  >
  implements ICreditApprovalRequestRepo
{
  constructor(
    @InjectRepository(CreditApprovalRequestEntity) internalRepo: Repository<CreditApprovalRequestEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(CreditApprovalRequestRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CreditApprovalRequestEntity, CreditApprovalRequest);
  }

  public override get idColumnName(): keyof CreditApprovalRequestEntity {
    return 'id';
  }

  /** Pending-approvals list renders bill number and customer name — pull both in one join. */
  public override async allAsync(filterObj?: Filter<CreditApprovalRequestFilter>): Promise<CreditApprovalRequest[]> {
    try {
      const opts = this.createFilterOpts(filterObj);
      const es = await this.internalRepo.find({ ...opts, relations: { bill: { customer: true } } });
      return this.mapToModelArray(es);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
}
