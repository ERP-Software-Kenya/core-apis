import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer } from '../../../../../common';
import { CATEGORY_REPO } from '../../../../constants';
import { Category, CategoryFilter } from '../../domain';
import { ICategoryRepo } from '../..';
import { CategoryFilterNormalizer } from '../../helpers';
import { ListCategoriesQuery } from './list-categories.query';

@QueryHandlerStrict(ListCategoriesQuery)
export class ListCategoriesQueryHandler implements IQueryHandler<ListCategoriesQuery, Category[]> {
  constructor(
    @Inject(CATEGORY_REPO) protected readonly repo: ICategoryRepo,
    @Inject(CategoryFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<CategoryFilter>,
    @InjectPinoLogger(ListCategoriesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListCategoriesQuery): Promise<Category[]> {
    this.logger.info(`Executing Query "${ListCategoriesQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
