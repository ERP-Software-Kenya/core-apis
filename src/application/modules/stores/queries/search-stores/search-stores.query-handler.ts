import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer, IPageable } from '../../../../../common';
import { STORE_REPO } from '../../../../constants';
import { Store, StoreFilter } from '../../domain';
import { IStoreRepo } from '../..';
import { StoreFilterNormalizer } from '../../helpers';
import { SearchStoresQuery } from './search-stores.query';

@QueryHandlerStrict(SearchStoresQuery)
export class SearchStoresQueryHandler implements IQueryHandler<SearchStoresQuery, IPageable<Store>> {
  constructor(
    @Inject(STORE_REPO) protected readonly repo: IStoreRepo,
    @Inject(StoreFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<StoreFilter>,
    @InjectPinoLogger(SearchStoresQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchStoresQuery): Promise<IPageable<Store>> {
    this.logger.info(`Executing Query "${SearchStoresQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
