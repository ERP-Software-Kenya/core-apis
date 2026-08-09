import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { StateFilter } from '../domain';
import { StateFeatureOptions } from '../options';

@Injectable()
export class StateFilterNormalizer implements IFilterNormalizer<StateFilter, number> {
  constructor(public options: StateFeatureOptions) {}

  public normalize(filter: Filter<StateFilter, number>): Filter<StateFilter, number> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order   = filter.$order   ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<StateFilter, number>): PageableFilter<StateFilter, number> {
    filter          = this.normalize(filter);
    filter.$page    = filter.$page    ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
