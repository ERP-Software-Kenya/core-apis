import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { CountryFilter } from '../domain';
import { CountryFeatureOptions } from '../options';

@Injectable()
export class CountryFilterNormalizer implements IFilterNormalizer<CountryFilter, number> {
  constructor(public options: CountryFeatureOptions) {}

  public normalize(filter: Filter<CountryFilter, number>): Filter<CountryFilter, number> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order   = filter.$order   ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<CountryFilter, number>): PageableFilter<CountryFilter, number> {
    filter          = this.normalize(filter);
    filter.$page    = filter.$page    ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
