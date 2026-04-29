import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { InventoryFilter } from '../domain';
import { InventoryFeatureOptions } from '../options';

@Injectable()
export class InventoryFilterNormalizer implements IFilterNormalizer<InventoryFilter> {
  constructor(public options: InventoryFeatureOptions) {}

  public normalize(filter: Filter<InventoryFilter>): Filter<InventoryFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<InventoryFilter>): PageableFilter<InventoryFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
