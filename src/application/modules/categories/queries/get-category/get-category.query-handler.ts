import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { CATEGORY_REPO } from '../../../../constants';
import { Category } from '../../domain';
import { ICategoryRepo } from '../..';
import { GetCategoryQuery } from './get-category.query';

@QueryHandlerStrict(GetCategoryQuery)
export class GetCategoryQueryHandler implements IQueryHandler<GetCategoryQuery, Category> {
  constructor(
    @Inject(CATEGORY_REPO) private readonly repo: ICategoryRepo,
    @InjectPinoLogger(GetCategoryQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetCategoryQuery): Promise<Category> {
    this.logger.info(`Executing ${GetCategoryQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
