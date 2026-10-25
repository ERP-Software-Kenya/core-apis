import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { QuotationItemEntity } from '../entities';
import { QuotationItem, QuotationItemFilter } from '../../../application/modules/quotations/domain';
import { IQuotationItemRepo } from '../../../application/modules/quotations/i-quotation-item.repo';

@Injectable()
export class QuotationItemRepo
  extends BaseRepo<
    QuotationItemEntity,
    QuotationItem,
    string,
    PageableFilter<QuotationItemFilter>,
    Filter<QuotationItemFilter>
  >
  implements IQuotationItemRepo
{
  constructor(
    @InjectRepository(QuotationItemEntity) internalRepo: Repository<QuotationItemEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(QuotationItemRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, QuotationItemEntity, QuotationItem);
  }

  public override get idColumnName(): keyof QuotationItemEntity {
    return 'id';
  }
}
