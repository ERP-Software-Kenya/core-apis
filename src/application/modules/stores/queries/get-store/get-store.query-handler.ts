import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { STORE_REPO } from '../../../../constants';
import { Store } from '../../domain';
import { IStoreRepo } from '../..';
import { GetStoreQuery } from './get-store.query';

@QueryHandlerStrict(GetStoreQuery)
export class GetStoreQueryHandler implements IQueryHandler<GetStoreQuery, Store> {
  constructor(
    @Inject(STORE_REPO) private readonly repo: IStoreRepo,
    @InjectPinoLogger(GetStoreQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetStoreQuery): Promise<Store> {
    this.logger.info(`Executing ${GetStoreQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
