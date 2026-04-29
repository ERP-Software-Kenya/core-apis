import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { OrganizationFilter } from '../domain';
import { OrganizationFeatureOptions } from '../options';

@Injectable()
export class OrganizationFilterNormalizer implements IFilterNormalizer<OrganizationFilter> {
  constructor(public options: OrganizationFeatureOptions) {}

  public normalize(filter: Filter<OrganizationFilter>): Filter<OrganizationFilter> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<OrganizationFilter>): PageableFilter<OrganizationFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
