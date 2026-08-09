import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { CityFilter } from '../domain';
import { CityFeatureOptions } from '../options';

@Injectable()
export class CityFilterNormalizer implements IFilterNormalizer<CityFilter, number> {
  constructor(public options: CityFeatureOptions) {}

  public normalize(filter: Filter<CityFilter, number>): Filter<CityFilter, number> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order   = filter.$order   ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<CityFilter, number>): PageableFilter<CityFilter, number> {
    filter          = this.normalize(filter);
    filter.$page    = filter.$page    ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
