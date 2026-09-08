import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetRevenueTrendQuery } from './get-revenue-trend.query';
import { RevenueTrendPointResponse } from '../../models';

interface RawTrendRow {
  period: string;
  revenue: string;
  billCount: string;
}

function formatExpr(trunc: string): string {
  if (trunc === 'hour') return `TO_CHAR(DATE_TRUNC('hour', created_at), 'YYYY-MM-DD HH24:00')`;
  if (trunc === 'day') return `TO_CHAR(DATE_TRUNC('day', created_at), 'YYYY-MM-DD')`;
  return `TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM')`;
}

@QueryHandlerStrict(GetRevenueTrendQuery)
export class GetRevenueTrendHandler implements IQueryHandler<GetRevenueTrendQuery, RevenueTrendPointResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetRevenueTrendHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetRevenueTrendQuery): Promise<RevenueTrendPointResponse[]> {
    this.logger.info(`Executing Query '${GetRevenueTrendQuery.name}'`);

    const trunc = query.trunc ?? 'month';
    const from = query.from;
    const to = query.to;
    const labelExpr = formatExpr(trunc);

    const sql = `
      SELECT
        ${labelExpr} AS period,
        COALESCE(SUM(total_amount), 0) AS revenue,
        COUNT(*) AS "billCount"
      FROM core.bills
      WHERE organization_id = $1
        AND status = 'COMPLETED'
        AND deleted_at IS NULL
        AND created_at >= $2
        AND created_at <= $3
        AND ($4::uuid IS NULL OR location_id = $4)
        AND ($5::uuid IS NULL OR EXISTS (
          SELECT 1 FROM core.locations l WHERE l.id = location_id AND l.branch_id = $5
        ))
        AND ($6::uuid[] IS NULL OR location_id = ANY($6))
      GROUP BY DATE_TRUNC('${trunc}', created_at)
      ORDER BY DATE_TRUNC('${trunc}', created_at)
    `;

    const rows = await this.dataSource.query<RawTrendRow[]>(sql, [
      query.organizationId,
      from,
      to,
      query.locationId ?? null,
      query.branchId ?? null,
      query.locationIds ?? null,
    ]);

    return rows.map((row) => ({
      month: row.period,
      revenue: Number(row.revenue),
      billCount: Number(row.billCount),
    }));
  }
}
