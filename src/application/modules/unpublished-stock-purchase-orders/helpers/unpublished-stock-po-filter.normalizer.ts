import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { UnpublishedStockPOFilter } from '../domain';
import { UnpublishedStockPOFeatureOptions } from '../options';

@Injectable()
export class UnpublishedStockPOFilterNormalizer implements IFilterNormalizer<UnpublishedStockPOFilter> {
  constructor(public options: UnpublishedStockPOFeatureOptions) {}

  public normalize(filter: Filter<UnpublishedStockPOFilter>): Filter<UnpublishedStockPOFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order   = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<UnpublishedStockPOFilter>): PageableFilter<UnpublishedStockPOFilter> {
    filter          = this.normalize(filter);
    filter.$page    = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
