import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { CurrencyFilter } from '../domain';
import { CurrencyFeatureOptions } from '../options';

@Injectable()
export class CurrencyFilterNormalizer implements IFilterNormalizer<CurrencyFilter, number> {
  constructor(public options: CurrencyFeatureOptions) {}

  public normalize(filter: Filter<CurrencyFilter, number>): Filter<CurrencyFilter, number> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order   = filter.$order   ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<CurrencyFilter, number>): PageableFilter<CurrencyFilter, number> {
    filter          = this.normalize(filter);
    filter.$page    = filter.$page    ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
