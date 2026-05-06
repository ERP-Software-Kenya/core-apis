import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { InvoiceEntity } from '../entities';
import { Invoice } from '../../../application/modules/invoices/domain';
import { IInvoiceRepo, InvoiceFilter } from '../../../application/modules/invoices';

@Injectable()
export class InvoiceRepo extends BaseRepo<InvoiceEntity, Invoice, string, PageableFilter<InvoiceFilter>, Filter<InvoiceFilter>> implements IInvoiceRepo {
  constructor(
    @InjectRepository(InvoiceEntity) internalRepo: Repository<InvoiceEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(InvoiceRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, InvoiceEntity, Invoice);
  }

  public override get idColumnName(): keyof InvoiceEntity {
    return 'id';
  }
}
