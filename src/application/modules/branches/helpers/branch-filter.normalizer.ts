import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { BranchFilter } from '../domain';
import { BranchFeatureOptions } from '../options';

@Injectable()
export class BranchFilterNormalizer implements IFilterNormalizer<BranchFilter> {
  constructor(public options: BranchFeatureOptions) {}

  public normalize(filter: Filter<BranchFilter>): Filter<BranchFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<BranchFilter>): PageableFilter<BranchFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
