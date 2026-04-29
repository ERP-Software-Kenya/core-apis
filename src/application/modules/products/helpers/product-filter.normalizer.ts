import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { ProductFilter } from '../domain';
import { ProductFeatureOptions } from '../options';

@Injectable()
export class ProductFilterNormalizer implements IFilterNormalizer<ProductFilter> {
  constructor(public options: ProductFeatureOptions) {}

  public normalize(filter: Filter<ProductFilter>): Filter<ProductFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<ProductFilter>): PageableFilter<ProductFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
