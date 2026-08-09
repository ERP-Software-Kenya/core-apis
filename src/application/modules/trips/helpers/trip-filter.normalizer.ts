import { Injectable, Inject } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from 'src/common';
import { TripFeatureOptions } from '../options';
import { Trip } from '../domain';

@Injectable()
export class TripFilterNormalizer implements IFilterNormalizer<Trip> {
  @Inject(TripFeatureOptions) public readonly options: TripFeatureOptions;

  public normalize(filter: Filter<Trip, string>): Filter<Trip, string> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<Trip, string>): PageableFilter<Trip, string> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
