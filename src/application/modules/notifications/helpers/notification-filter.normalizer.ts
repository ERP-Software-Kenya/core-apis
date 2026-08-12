import { Injectable } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from '../../../../common';
import { NotificationFilter } from '../domain';
import { NotificationFeatureOptions } from '../options/notification-feature.options';

@Injectable()
export class NotificationFilterNormalizer implements IFilterNormalizer<NotificationFilter> {
  constructor(public options: NotificationFeatureOptions) {}

  public normalize(filter: Filter<NotificationFilter>): Filter<NotificationFilter> {
    const row = filter as Filter<NotificationFilter> & { organizationId?: string };
    if (row.orgId) {
      row.organizationId = row.orgId;
      delete row.orgId;
    }
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<NotificationFilter>): PageableFilter<NotificationFilter> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
