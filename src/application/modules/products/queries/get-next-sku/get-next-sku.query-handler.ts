import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PRODUCT_REPO } from '../../../../constants';
import { IProductRepo } from '../..';
import { generateSku } from '../../helpers';
import { NextSkuResponse } from '../../models';
import { GetNextSkuQuery } from './get-next-sku.query';

@QueryHandlerStrict(GetNextSkuQuery)
export class GetNextSkuQueryHandler implements IQueryHandler<GetNextSkuQuery, NextSkuResponse> {
  constructor(
    @Inject(PRODUCT_REPO) private readonly repo: IProductRepo,
    @InjectPinoLogger(GetNextSkuQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetNextSkuQuery): Promise<NextSkuResponse> {
    this.logger.info(`Executing Query "${GetNextSkuQuery.name}"`);
    const count = await this.repo.countAsync({ organizationId: query.organizationId });
    return { sku: generateSku(query.name, count + 1) };
  }
}
