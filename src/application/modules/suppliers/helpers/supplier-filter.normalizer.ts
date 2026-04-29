import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { SupplierFilter } from '../domain';
import { SupplierFeatureOptions } from '../options';

@Injectable()
export class SupplierFilterNormalizer implements IFilterNormalizer<SupplierFilter> {
  constructor(public options: SupplierFeatureOptions) {}

  public normalize(filter: Filter<SupplierFilter>): Filter<SupplierFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<SupplierFilter>): PageableFilter<SupplierFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
