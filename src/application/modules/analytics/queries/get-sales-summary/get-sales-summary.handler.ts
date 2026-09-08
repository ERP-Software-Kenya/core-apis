import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { resolvePreviousAnalyticsPeriod, type AnalyticsPeriodPreset } from '../../analytics-period.util';
import { GetSalesSummaryQuery } from './get-sales-summary.query';
import {
  SalesProductHighlightResponse,
  SalesSummaryResponse,
} from '../../models';

interface RawSummary {
  revenueInPeriod: string;
  avgBillValue: string;
  completedBills: string;
  pendingBills: string;
  totalUnitsSold: string;
}

interface RawCustomerCount {
  activeCustomers: string;
}

interface RawProductRank {
  productId: string;
  productName: string;
  metricValue: string;
}

interface PeriodParams {
  organizationId: string;
  from: Date;
  to: Date;
  branchId?: string;
  locationId?: string;
  locationIds?: string[];
}

async function fetchPeriodMetrics(
  dataSource: DataSource,
  params: PeriodParams,
): Promise<{
  revenue: number;
  avgBillValue: number;
  completedBills: number;
  pendingBills: number;
  activeCustomers: number;
  totalUnitsSold: number;
}> {
  const summarySql = `
    SELECT
      COALESCE(SUM(CASE WHEN b.status = 'COMPLETED' THEN b.total_amount ELSE 0 END), 0) AS "revenueInPeriod",
      COALESCE(AVG(CASE WHEN b.status = 'COMPLETED' THEN b.total_amount END), 0) AS "avgBillValue",
      COUNT(CASE WHEN b.status = 'COMPLETED' THEN 1 END) AS "completedBills",
      COUNT(CASE WHEN b.status IN ('INITIATED', 'DRAFT') THEN 1 END) AS "pendingBills",
      COALESCE((
        SELECT SUM(bi.quantity)
        FROM core.bill_items bi
        JOIN core.bills cb ON cb.id = bi.bill_id
        WHERE cb.organization_id = $1
          AND cb.status = 'COMPLETED'
          AND cb.deleted_at IS NULL
          AND cb.created_at >= $2
          AND cb.created_at <= $3
          AND ($4::uuid IS NULL OR cb.location_id = $4)
          AND ($5::uuid IS NULL OR EXISTS (
            SELECT 1 FROM core.locations l WHERE l.id = cb.location_id AND l.branch_id = $5
          ))
          AND ($6::uuid[] IS NULL OR cb.location_id = ANY($6))
      ), 0) AS "totalUnitsSold"
    FROM core.bills b
    WHERE b.organization_id = $1
      AND b.deleted_at IS NULL
      AND b.created_at >= $2
      AND b.created_at <= $3
      AND ($4::uuid IS NULL OR b.location_id = $4)
      AND ($5::uuid IS NULL OR EXISTS (
        SELECT 1 FROM core.locations l WHERE l.id = b.location_id AND l.branch_id = $5
      ))
      AND ($6::uuid[] IS NULL OR b.location_id = ANY($6))
  `;

  const customersSql = `
    SELECT COUNT(DISTINCT customer_id) AS "activeCustomers"
    FROM core.bills
    WHERE organization_id = $1
      AND customer_id IS NOT NULL
      AND status = 'COMPLETED'
      AND deleted_at IS NULL
      AND created_at >= $2
      AND created_at <= $3
      AND ($4::uuid IS NULL OR location_id = $4)
      AND ($5::uuid IS NULL OR EXISTS (
        SELECT 1 FROM core.locations l WHERE l.id = location_id AND l.branch_id = $5
      ))
      AND ($6::uuid[] IS NULL OR location_id = ANY($6))
  `;

  const sqlParams = [
    params.organizationId,
    params.from,
    params.to,
    params.locationId ?? null,
    params.branchId ?? null,
    params.locationIds ?? null,
  ];
  const [summary] = await dataSource.query<RawSummary[]>(summarySql, sqlParams);
  const [customers] = await dataSource.query<RawCustomerCount[]>(customersSql, sqlParams);

  return {
    revenue: Number(summary.revenueInPeriod),
    avgBillValue: Number(summary.avgBillValue),
    completedBills: Number(summary.completedBills),
    pendingBills: Number(summary.pendingBills),
    totalUnitsSold: Number(summary.totalUnitsSold),
    activeCustomers: Number(customers.activeCustomers),
  };
}

async function fetchTopByRevenue(
  dataSource: DataSource,
  params: PeriodParams,
): Promise<RawProductRank | undefined> {
  const sql = `
    SELECT
      bi.product_id AS "productId",
      p.name AS "productName",
      COALESCE(SUM(bi.line_total), 0) AS "metricValue"
    FROM core.bill_items bi
    JOIN core.bills b ON b.id = bi.bill_id
    JOIN core.products p ON p.id = bi.product_id
    WHERE b.organization_id = $1
      AND b.status = 'COMPLETED'
      AND b.deleted_at IS NULL
      AND b.created_at >= $2
      AND b.created_at <= $3
      AND ($4::uuid IS NULL OR b.location_id = $4)
      AND ($5::uuid IS NULL OR EXISTS (
        SELECT 1 FROM core.locations l WHERE l.id = b.location_id AND l.branch_id = $5
      ))
      AND ($6::uuid[] IS NULL OR b.location_id = ANY($6))
    GROUP BY bi.product_id, p.name
    ORDER BY SUM(bi.line_total) DESC
    LIMIT 1
  `;
  const rows = await dataSource.query<RawProductRank[]>(sql, [
    params.organizationId, params.from, params.to, params.locationId ?? null, params.branchId ?? null, params.locationIds ?? null,
  ]);
  return rows[0];
}

async function fetchTopByMargin(
  dataSource: DataSource,
  params: PeriodParams,
): Promise<RawProductRank | undefined> {
  const sql = `
    SELECT
      bi.product_id AS "productId",
      p.name AS "productName",
      COALESCE(SUM((bi.unit_price - COALESCE(p.cost_price, 0)) * bi.quantity), 0) AS "metricValue"
    FROM core.bill_items bi
    JOIN core.bills b ON b.id = bi.bill_id
    JOIN core.products p ON p.id = bi.product_id
    WHERE b.organization_id = $1
      AND b.status = 'COMPLETED'
      AND b.deleted_at IS NULL
      AND b.created_at >= $2
      AND b.created_at <= $3
      AND ($4::uuid IS NULL OR b.location_id = $4)
      AND ($5::uuid IS NULL OR EXISTS (
        SELECT 1 FROM core.locations l WHERE l.id = b.location_id AND l.branch_id = $5
      ))
      AND ($6::uuid[] IS NULL OR b.location_id = ANY($6))
    GROUP BY bi.product_id, p.name
    HAVING SUM(bi.line_total) > 0
    ORDER BY SUM((bi.unit_price - COALESCE(p.cost_price, 0)) * bi.quantity) DESC
    LIMIT 1
  `;
  const rows = await dataSource.query<RawProductRank[]>(sql, [
    params.organizationId, params.from, params.to, params.locationId ?? null, params.branchId ?? null, params.locationIds ?? null,
  ]);
  return rows[0];
}

async function fetchTopByAvgPrice(
  dataSource: DataSource,
  params: PeriodParams,
): Promise<RawProductRank | undefined> {
  const sql = `
    SELECT
      bi.product_id AS "productId",
      p.name AS "productName",
      COALESCE(AVG(bi.unit_price), 0) AS "metricValue"
    FROM core.bill_items bi
    JOIN core.bills b ON b.id = bi.bill_id
    JOIN core.products p ON p.id = bi.product_id
    WHERE b.organization_id = $1
      AND b.status = 'COMPLETED'
      AND b.deleted_at IS NULL
      AND b.created_at >= $2
      AND b.created_at <= $3
      AND ($4::uuid IS NULL OR b.location_id = $4)
      AND ($5::uuid IS NULL OR EXISTS (
        SELECT 1 FROM core.locations l WHERE l.id = b.location_id AND l.branch_id = $5
      ))
      AND ($6::uuid[] IS NULL OR b.location_id = ANY($6))
    GROUP BY bi.product_id, p.name
    HAVING SUM(bi.quantity) > 0
    ORDER BY AVG(bi.unit_price) DESC
    LIMIT 1
  `;
  const rows = await dataSource.query<RawProductRank[]>(sql, [
    params.organizationId, params.from, params.to, params.locationId ?? null, params.branchId ?? null, params.locationIds ?? null,
  ]);
  return rows[0];
}

async function fetchProductRevenueInPeriod(
  dataSource: DataSource,
  params: PeriodParams,
  productId: string,
): Promise<number> {
  const sql = `
    SELECT COALESCE(SUM(bi.line_total), 0) AS "metricValue"
    FROM core.bill_items bi
    JOIN core.bills b ON b.id = bi.bill_id
    WHERE b.organization_id = $1
      AND bi.product_id = $2
      AND b.status = 'COMPLETED'
      AND b.deleted_at IS NULL
      AND b.created_at >= $3
      AND b.created_at <= $4
      AND ($5::uuid IS NULL OR b.location_id = $5)
      AND ($6::uuid IS NULL OR EXISTS (
        SELECT 1 FROM core.locations l WHERE l.id = b.location_id AND l.branch_id = $6
      ))
      AND ($7::uuid[] IS NULL OR b.location_id = ANY($7))
  `;
  const [row] = await dataSource.query<RawProductRank[]>(sql, [
    params.organizationId, productId, params.from, params.to, params.locationId ?? null, params.branchId ?? null, params.locationIds ?? null,
  ]);
  return Number(row?.metricValue ?? 0);
}

async function fetchProductMarginInPeriod(
  dataSource: DataSource,
  params: PeriodParams,
  productId: string,
): Promise<number> {
  const sql = `
    SELECT COALESCE(SUM((bi.unit_price - COALESCE(p.cost_price, 0)) * bi.quantity), 0) AS "metricValue"
    FROM core.bill_items bi
    JOIN core.bills b ON b.id = bi.bill_id
    JOIN core.products p ON p.id = bi.product_id
    WHERE b.organization_id = $1
      AND bi.product_id = $2
      AND b.status = 'COMPLETED'
      AND b.deleted_at IS NULL
      AND b.created_at >= $3
      AND b.created_at <= $4
      AND ($5::uuid IS NULL OR b.location_id = $5)
      AND ($6::uuid IS NULL OR EXISTS (
        SELECT 1 FROM core.locations l WHERE l.id = b.location_id AND l.branch_id = $6
      ))
      AND ($7::uuid[] IS NULL OR b.location_id = ANY($7))
  `;
  const [row] = await dataSource.query<RawProductRank[]>(sql, [
    params.organizationId, productId, params.from, params.to, params.locationId ?? null, params.branchId ?? null, params.locationIds ?? null,
  ]);
  return Number(row?.metricValue ?? 0);
}

async function fetchProductAvgPriceInPeriod(
  dataSource: DataSource,
  params: PeriodParams,
  productId: string,
): Promise<number> {
  const sql = `
    SELECT COALESCE(AVG(bi.unit_price), 0) AS "metricValue"
    FROM core.bill_items bi
    JOIN core.bills b ON b.id = bi.bill_id
    WHERE b.organization_id = $1
      AND bi.product_id = $2
      AND b.status = 'COMPLETED'
      AND b.deleted_at IS NULL
      AND b.created_at >= $3
      AND b.created_at <= $4
      AND ($5::uuid IS NULL OR b.location_id = $5)
      AND ($6::uuid IS NULL OR EXISTS (
        SELECT 1 FROM core.locations l WHERE l.id = b.location_id AND l.branch_id = $6
      ))
      AND ($7::uuid[] IS NULL OR b.location_id = ANY($7))
  `;
  const [row] = await dataSource.query<RawProductRank[]>(sql, [
    params.organizationId, productId, params.from, params.to, params.locationId ?? null, params.branchId ?? null, params.locationIds ?? null,
  ]);
  return Number(row?.metricValue ?? 0);
}

function toHighlight(
  current: RawProductRank | undefined,
  previousValue: number,
): SalesProductHighlightResponse | undefined {
  if (!current) return undefined;
  return {
    productId: current.productId,
    productName: current.productName,
    currentValue: Number(current.metricValue),
    previousValue,
  };
}

@QueryHandlerStrict(GetSalesSummaryQuery)
export class GetSalesSummaryHandler implements IQueryHandler<GetSalesSummaryQuery, SalesSummaryResponse> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetSalesSummaryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetSalesSummaryQuery): Promise<SalesSummaryResponse> {
    this.logger.info(`Executing Query '${GetSalesSummaryQuery.name}'`);

    const hasRange = Boolean(query.from && query.to);

    if (!hasRange) {
      const params: PeriodParams = {
        organizationId: query.organizationId,
        from: new Date(Date.now() - 30 * 86400000),
        to: new Date(),
        branchId: query.branchId,
        locationId: query.locationId,
        locationIds: query.locationIds,
      };
      const metrics = await fetchPeriodMetrics(this.dataSource, params);
      return {
        revenueThisMonth: metrics.revenue,
        revenueThisWeek: metrics.revenue,
        avgBillValue: metrics.avgBillValue,
        completedBills: metrics.completedBills,
        pendingBills: metrics.pendingBills,
        activeCustomers: metrics.activeCustomers,
        totalUnitsSold: metrics.totalUnitsSold,
      };
    }

    const currentParams: PeriodParams = {
      organizationId: query.organizationId,
      from: query.from!,
      to: query.to!,
      branchId: query.branchId,
      locationId: query.locationId,
      locationIds: query.locationIds,
    };

    const current = await fetchPeriodMetrics(this.dataSource, currentParams);
    const preset = (query.period ?? 'month') as AnalyticsPeriodPreset;
    const previousWindow = resolvePreviousAnalyticsPeriod(preset, query.from!, query.to!);
    const previousParams: PeriodParams = {
      organizationId: query.organizationId,
      from: previousWindow.from,
      to: previousWindow.to,
      branchId: query.branchId,
      locationId: query.locationId,
      locationIds: query.locationIds,
    };

    const [previous, topSelling, topMargin, topCostly] = await Promise.all([
      fetchPeriodMetrics(this.dataSource, previousParams),
      fetchTopByRevenue(this.dataSource, currentParams),
      fetchTopByMargin(this.dataSource, currentParams),
      fetchTopByAvgPrice(this.dataSource, currentParams),
    ]);

    const [topSellingPrev, topMarginPrev, topCostlyPrev] = await Promise.all([
      topSelling
        ? fetchProductRevenueInPeriod(this.dataSource, previousParams, topSelling.productId)
        : Promise.resolve(0),
      topMargin
        ? fetchProductMarginInPeriod(this.dataSource, previousParams, topMargin.productId)
        : Promise.resolve(0),
      topCostly
        ? fetchProductAvgPriceInPeriod(this.dataSource, previousParams, topCostly.productId)
        : Promise.resolve(0),
    ]);

    return {
      revenueThisMonth: current.revenue,
      revenueThisWeek: current.revenue,
      avgBillValue: current.avgBillValue,
      completedBills: current.completedBills,
      pendingBills: current.pendingBills,
      activeCustomers: current.activeCustomers,
      totalUnitsSold: current.totalUnitsSold,
      comparisonLabel: previousWindow.label,
      previous: {
        completedBills: previous.completedBills,
        activeCustomers: previous.activeCustomers,
        totalUnitsSold: previous.totalUnitsSold,
        revenue: previous.revenue,
        avgBillValue: previous.avgBillValue,
      },
      topSelling: toHighlight(topSelling, topSellingPrev),
      topMargin: toHighlight(topMargin, topMarginPrev),
      topCostly: toHighlight(topCostly, topCostlyPrev),
    };
  }
}
