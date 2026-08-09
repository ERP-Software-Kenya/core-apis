import { Injectable, Inject } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from 'src/common';
import { DriverFeatureOptions } from '../options';
import { Driver } from '../domain';

@Injectable()
export class DriverFilterNormalizer implements IFilterNormalizer<Driver> {
  @Inject(DriverFeatureOptions) public readonly options: DriverFeatureOptions;

  public normalize(filter: Filter<Driver, string>): Filter<Driver, string> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<Driver, string>): PageableFilter<Driver, string> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
