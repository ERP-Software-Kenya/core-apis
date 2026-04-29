import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer } from '../../../../../common';
import { STORE_REPO } from '../../../../constants';
import { Store, StoreFilter } from '../../domain';
import { IStoreRepo } from '../..';
import { StoreFilterNormalizer } from '../../helpers';
import { ListStoresQuery } from './list-stores.query';

@QueryHandlerStrict(ListStoresQuery)
export class ListStoresQueryHandler implements IQueryHandler<ListStoresQuery, Store[]> {
  constructor(
    @Inject(STORE_REPO) protected readonly repo: IStoreRepo,
    @Inject(StoreFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<StoreFilter>,
    @InjectPinoLogger(ListStoresQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListStoresQuery): Promise<Store[]> {
    this.logger.info(`Executing Query "${ListStoresQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
