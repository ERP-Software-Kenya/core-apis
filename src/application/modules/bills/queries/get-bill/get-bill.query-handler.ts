import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { BILL_REPO } from '../../../../constants';
import { Bill } from '../../domain';
import { IBillRepo } from '../..';
import { GetBillQuery } from './get-bill.query';

@QueryHandlerStrict(GetBillQuery)
export class GetBillQueryHandler implements IQueryHandler<GetBillQuery, Bill> {
  constructor(
    @Inject(BILL_REPO) protected readonly repo: IBillRepo,
    @InjectPinoLogger(GetBillQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetBillQuery): Promise<Bill> {
    this.logger.info(`Executing Query "${GetBillQuery.name}"`);
    return this.repo.getAsync(query.id);
  }
}
