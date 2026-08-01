import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { CategoryFilter } from '..';
import { CategoryFeatureOptions } from '../options';

@Injectable()
export class CategoryFilterNormalizer implements IFilterNormalizer<CategoryFilter> {
  constructor(public options: CategoryFeatureOptions) {}

  public normalize(filter: Filter<CategoryFilter>): Filter<CategoryFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<CategoryFilter>): PageableFilter<CategoryFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
