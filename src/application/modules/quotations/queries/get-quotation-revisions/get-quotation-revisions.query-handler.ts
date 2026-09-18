import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { Quotation } from '../../domain';
import { IQuotationRepo } from '../../i-quotation.repo';
import { GetQuotationRevisionsQuery } from './get-quotation-revisions.query';

@QueryHandlerStrict(GetQuotationRevisionsQuery)
export class GetQuotationRevisionsQueryHandler
  implements IQueryHandler<GetQuotationRevisionsQuery, Quotation[]>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly repo: IQuotationRepo,
    @InjectPinoLogger(GetQuotationRevisionsQueryHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetQuotationRevisionsQuery): Promise<Quotation[]> {
    this.logger.info(`Executing ${GetQuotationRevisionsQuery.name} for ${query.id}`);
    const quotation = await this.repo.getWithDetailsAsync(query.id);
    if (!quotation) {
      throw new NotFoundException(`Quotation ${query.id} not found`);
    }
    return this.repo.getRevisionsAsync(quotation.rootQuotationId);
  }
}
