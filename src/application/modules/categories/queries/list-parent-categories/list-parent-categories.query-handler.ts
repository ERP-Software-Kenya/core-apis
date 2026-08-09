import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer } from '../../../../../common';
import { CATEGORY_REPO } from '../../../../constants';
import { Category, CategoryFilter } from '../../domain';
import { ICategoryRepo } from '../..';
import { CategoryFilterNormalizer } from '../../helpers';
import { ListParentCategoriesQuery } from './list-parent-categories.query';

@QueryHandlerStrict(ListParentCategoriesQuery)
export class ListParentCategoriesQueryHandler implements IQueryHandler<ListParentCategoriesQuery, Category[]> {
  constructor(
    @Inject(CATEGORY_REPO) protected readonly repo: ICategoryRepo,
    @Inject(CategoryFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<CategoryFilter>,
    @InjectPinoLogger(ListParentCategoriesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListParentCategoriesQuery): Promise<Category[]> {
    this.logger.info(`Executing Query "${ListParentCategoriesQuery.name}"`);
    const normalized   = this.filterNormalizer.normalize(query);
    normalized.parentId = null;
    return this.repo.allAsync(normalized);
  }
}
