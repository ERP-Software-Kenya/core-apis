import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetSalesSummaryQuery } from './get-sales-summary.query';
import { SalesSummaryResponse } from '../../models/responses/sales-summary.response';

interface RawSummary {
  revenueThisMonth: string;
  revenueThisWeek: string;
  avgBillValue: string;
  completedBills: string;
  pendingBills: string;
}

interface RawCustomerCount {
  activeCustomers: string;
}

const SUMMARY_SQL = `
  SELECT
    COALESCE(SUM(CASE WHEN DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW())
      AND status = 'COMPLETED' THEN total_amount ELSE 0 END), 0) AS "revenueThisMonth",
    COALESCE(SUM(CASE WHEN DATE_TRUNC('week', created_at) = DATE_TRUNC('week', NOW())
      AND status = 'COMPLETED' THEN total_amount ELSE 0 END), 0) AS "revenueThisWeek",
    COALESCE(AVG(CASE WHEN status = 'COMPLETED' THEN total_amount END), 0) AS "avgBillValue",
    COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS "completedBills",
    COUNT(CASE WHEN status IN ('INITIATED', 'DRAFT') THEN 1 END) AS "pendingBills"
  FROM core.bills
  WHERE organization_id = $1 AND deleted_at IS NULL
`;

const CUSTOMERS_SQL = `
  SELECT COUNT(DISTINCT customer_id) AS "activeCustomers"
  FROM core.bills
  WHERE organization_id = $1
    AND customer_id IS NOT NULL
    AND status = 'COMPLETED'
    AND created_at >= NOW() - INTERVAL '30 days'
    AND deleted_at IS NULL
`;

@QueryHandlerStrict(GetSalesSummaryQuery)
export class GetSalesSummaryHandler implements IQueryHandler<GetSalesSummaryQuery, SalesSummaryResponse> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetSalesSummaryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetSalesSummaryQuery): Promise<SalesSummaryResponse> {
    this.logger.info(`Executing Query '${GetSalesSummaryQuery.name}'`);
    const [summary] = await this.dataSource.query<RawSummary[]>(SUMMARY_SQL, [query.organizationId]);
    const [customers] = await this.dataSource.query<RawCustomerCount[]>(CUSTOMERS_SQL, [query.organizationId]);
    return {
      revenueThisMonth: Number(summary.revenueThisMonth),
      revenueThisWeek:  Number(summary.revenueThisWeek),
      avgBillValue:     Number(summary.avgBillValue),
      completedBills:   Number(summary.completedBills),
      pendingBills:     Number(summary.pendingBills),
      activeCustomers:  Number(customers.activeCustomers),
    };
  }
}
