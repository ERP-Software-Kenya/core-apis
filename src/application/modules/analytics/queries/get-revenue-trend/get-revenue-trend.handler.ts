import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetRevenueTrendQuery } from './get-revenue-trend.query';
import { RevenueTrendPointResponse } from '../../models';

interface RawTrendRow {
  month: string;
  revenue: string;
  billCount: string;
}

const TREND_SQL = `
  SELECT
    TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') AS month,
    COALESCE(SUM(total_amount), 0) AS revenue,
    COUNT(*) AS "billCount"
  FROM core.bills
  WHERE organization_id = $1
    AND status = 'COMPLETED'
    AND deleted_at IS NULL
    AND created_at >= $2
  GROUP BY DATE_TRUNC('month', created_at)
  ORDER BY DATE_TRUNC('month', created_at)
`;

@QueryHandlerStrict(GetRevenueTrendQuery)
export class GetRevenueTrendHandler implements IQueryHandler<GetRevenueTrendQuery, RevenueTrendPointResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetRevenueTrendHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetRevenueTrendQuery): Promise<RevenueTrendPointResponse[]> {
    this.logger.info(`Executing Query '${GetRevenueTrendQuery.name}'`);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - (query.months - 1));
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    const rows = await this.dataSource.query<RawTrendRow[]>(TREND_SQL, [query.organizationId, startDate]);
    return rows.map(row => ({
      month:     row.month,
      revenue:   Number(row.revenue),
      billCount: Number(row.billCount),
    }));
  }
}
