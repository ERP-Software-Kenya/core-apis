import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer, IPageable } from '../../../../../common';
import { CATEGORY_REPO } from '../../../../constants';
import { Category, CategoryFilter } from '../../domain';
import { ICategoryRepo } from '../..';
import { CategoryFilterNormalizer } from '../../helpers';
import { SearchCategoriesQuery } from './search-categories.query';

@QueryHandlerStrict(SearchCategoriesQuery)
export class SearchCategoriesQueryHandler implements IQueryHandler<SearchCategoriesQuery, IPageable<Category>> {
  constructor(
    @Inject(CATEGORY_REPO) protected readonly repo: ICategoryRepo,
    @Inject(CategoryFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<CategoryFilter>,
    @InjectPinoLogger(SearchCategoriesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchCategoriesQuery): Promise<IPageable<Category>> {
    this.logger.info(`Executing Query "${SearchCategoriesQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
