import { Inject, NotFoundException } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { TAX_REPO } from '../../../../constants';
import { Tax } from '../../domain';
import { ITaxRepo } from '../../i-tax.repo';
import { GetTaxQuery } from './get-tax.query';

@QueryHandlerStrict(GetTaxQuery)
export class GetTaxQueryHandler implements IQueryHandler<GetTaxQuery, Tax> {
  constructor(
    @Inject(TAX_REPO) private readonly repo: ITaxRepo,
    @InjectPinoLogger(GetTaxQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetTaxQuery): Promise<Tax> {
    this.logger.info(`Executing ${GetTaxQuery.name} id=${query.id}`);
    const result = await this.repo.getAsync(query.id);
    if (!result) {
      throw new NotFoundException(`Tax ${query.id} not found`);
    }
    return result;
  }
}
