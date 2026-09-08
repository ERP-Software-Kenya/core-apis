import { AuthenticatedUser } from '../../../common';
import { resolveAnalyticsBranchId, resolveAnalyticsLocationId, resolveAnalyticsLocationIds } from './analytics-scope.util';
import {
  type AnalyticsPeriodPreset,
  resolveAnalyticsPeriod,
  resolveMonthsRange,
} from './analytics-period.util';

export interface AnalyticsQueryContext {
  organizationId: string;
  branchId?: string;
  locationId?: string;
  locationIds?: string[];
  from: Date;
  to: Date;
  trunc: 'hour' | 'day' | 'month';
  preset: AnalyticsPeriodPreset;
}

export function buildAnalyticsQueryContext(
  user: AuthenticatedUser,
  query: { period?: string; from?: string; to?: string; branchId?: string; locationId?: string; months?: number },
): AnalyticsQueryContext {
  const organizationId = user.organizationId;
  const branchId = resolveAnalyticsBranchId(user, query.branchId);
  const locationId = resolveAnalyticsLocationId(user, query.locationId);
  const locationIds = resolveAnalyticsLocationIds(user, query.locationId);

  if (query.period || query.from || query.to) {
    const resolved = resolveAnalyticsPeriod({
      period: query.period,
      from: query.from,
      to: query.to,
    });
    return {
      organizationId,
      branchId,
      locationId,
      locationIds,
      from: resolved.from,
      to: resolved.to,
      trunc: resolved.trunc,
      preset: resolved.preset,
    };
  }

  const months = query.months ?? 6;
  const legacy = resolveMonthsRange(months);
  return {
    organizationId,
    branchId,
    locationId,
    locationIds,
    from: legacy.from,
    to: legacy.to,
    trunc: legacy.trunc,
    preset: 'month',
  };
}
