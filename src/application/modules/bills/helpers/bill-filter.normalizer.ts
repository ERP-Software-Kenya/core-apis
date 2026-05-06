import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { BillFilter } from '../domain';
import { BillFeatureOptions } from '../options';

@Injectable()
export class BillFilterNormalizer implements IFilterNormalizer<BillFilter> {
  constructor(public options: BillFeatureOptions) {}

  public normalize(filter: Filter<BillFilter>): Filter<BillFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<BillFilter>): PageableFilter<BillFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
