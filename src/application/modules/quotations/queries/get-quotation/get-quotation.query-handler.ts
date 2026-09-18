import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { Quotation } from '../../domain';
import { IQuotationRepo } from '../../i-quotation.repo';
import { GetQuotationQuery } from './get-quotation.query';

@QueryHandlerStrict(GetQuotationQuery)
export class GetQuotationQueryHandler
  implements IQueryHandler<GetQuotationQuery, Quotation>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly repo: IQuotationRepo,
    @InjectPinoLogger(GetQuotationQueryHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetQuotationQuery): Promise<Quotation> {
    this.logger.info(`Executing ${GetQuotationQuery.name} for ${query.id}`);
    const quotation = await this.repo.getWithDetailsAsync(query.id);
    if (!quotation) {
      throw new NotFoundException(`Quotation ${query.id} not found`);
    }
    return quotation;
  }
}
