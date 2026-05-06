import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { INVOICE_REPO } from '../../../../constants';
import { Invoice } from '../../domain';
import { IInvoiceRepo } from '../..';
import { GetInvoiceQuery } from './get-invoice.query';

@QueryHandlerStrict(GetInvoiceQuery)
export class GetInvoiceQueryHandler implements IQueryHandler<GetInvoiceQuery, Invoice> {
  constructor(
    @Inject(INVOICE_REPO) private readonly repo: IInvoiceRepo,
    @InjectPinoLogger(GetInvoiceQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetInvoiceQuery): Promise<Invoice> {
    this.logger.info(`Executing ${GetInvoiceQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
