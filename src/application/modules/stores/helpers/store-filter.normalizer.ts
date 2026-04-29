import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { StoreFilter } from '../domain';
import { StoreFeatureOptions } from '../options';

@Injectable()
export class StoreFilterNormalizer implements IFilterNormalizer<StoreFilter> {
  constructor(public options: StoreFeatureOptions) {}

  public normalize(filter: Filter<StoreFilter>): Filter<StoreFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<StoreFilter>): PageableFilter<StoreFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
