import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { LanguageFilter } from '../domain';
import { LanguageFeatureOptions } from '../options';

@Injectable()
export class LanguageFilterNormalizer implements IFilterNormalizer<LanguageFilter, number> {
  constructor(public options: LanguageFeatureOptions) {}

  public normalize(filter: Filter<LanguageFilter, number>): Filter<LanguageFilter, number> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order   = filter.$order   ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<LanguageFilter, number>): PageableFilter<LanguageFilter, number> {
    filter          = this.normalize(filter);
    filter.$page    = filter.$page    ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
