import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { PurchaseOrderFilter } from '../domain';
import { PurchaseOrderFeatureOptions } from '../options';

@Injectable()
export class PurchaseOrderFilterNormalizer implements IFilterNormalizer<PurchaseOrderFilter> {
  constructor(public options: PurchaseOrderFeatureOptions) {}

  public normalize(filter: Filter<PurchaseOrderFilter>): Filter<PurchaseOrderFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<PurchaseOrderFilter>): PageableFilter<PurchaseOrderFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
