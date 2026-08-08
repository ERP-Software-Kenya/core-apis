import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from 'src/common';
import { LocationFilter } from '../domain';
import { LocationFeatureOptions } from '../options';

@Injectable()
export class LocationFilterNormalizer implements IFilterNormalizer<LocationFilter> {
  constructor(public options: LocationFeatureOptions) {}

  public normalize(filter: Filter<LocationFilter>): Filter<LocationFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order   = filter.$order   ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<LocationFilter>): PageableFilter<LocationFilter> {
    filter          = this.normalize(filter);
    filter.$page    = filter.$page    ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
