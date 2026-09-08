import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetInventoryStatusTrendQuery } from './get-inventory-status-trend.query';
import { InventoryStatusTrendPointResponse } from '../../models';

interface RawRow {
  period: string;
  normal: string;
  low: string;
  out: string;
  over: string;
  dead: string;
}

function formatExpr(trunc: string): string {
  if (trunc === 'hour') return `TO_CHAR(bucket, 'YYYY-MM-DD HH24:00')`;
  if (trunc === 'day') return `TO_CHAR(bucket, 'YYYY-MM-DD')`;
  return `TO_CHAR(bucket, 'YYYY-MM')`;
}

function intervalExpr(trunc: string): string {
  if (trunc === 'hour') return `'1 hour'`;
  if (trunc === 'day') return `'1 day'`;
  return `'1 month'`;
}

@QueryHandlerStrict(GetInventoryStatusTrendQuery)
export class GetInventoryStatusTrendHandler
  implements IQueryHandler<GetInventoryStatusTrendQuery, InventoryStatusTrendPointResponse[]>
{
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetInventoryStatusTrendHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetInventoryStatusTrendQuery): Promise<InventoryStatusTrendPointResponse[]> {
    this.logger.info(`Executing Query '${GetInventoryStatusTrendQuery.name}'`);

    const trunc = query.trunc ?? 'day';
    const labelExpr = formatExpr(trunc);
    const step = intervalExpr(trunc);

    const sql = `
      WITH buckets AS (
        SELECT DATE_TRUNC('${trunc}', gs)::timestamp AS bucket
        FROM generate_series(
          DATE_TRUNC('${trunc}', $2::timestamp),
          DATE_TRUNC('${trunc}', $3::timestamp),
          ${step}::interval
        ) AS gs
      ),
      inv AS (
        SELECT
          i.product_id,
          i.quantity_on_hand,
          i.reorder_level,
          i.max_stock
        FROM core.inventory i
        INNER JOIN core.locations l ON l.id = i.location_id
        WHERE i.organization_id = $1
          AND ($4::uuid IS NULL OR i.location_id = $4)
          AND ($6::uuid IS NULL OR l.branch_id = $6)
          AND ($7::uuid[] IS NULL OR i.location_id = ANY($7))
      ),
      classified AS (
        SELECT
          b.bucket,
          CASE
            WHEN i.quantity_on_hand = 0 THEN 'out'
            WHEN i.reorder_level > 0 AND i.quantity_on_hand < i.reorder_level THEN 'low'
            WHEN i.max_stock IS NOT NULL AND i.max_stock > 0 AND i.quantity_on_hand > i.max_stock THEN 'over'
            WHEN i.quantity_on_hand > 0 AND NOT EXISTS (
              SELECT 1 FROM core.bill_items bi
              JOIN core.bills bl ON bl.id = bi.bill_id
              WHERE bi.product_id = i.product_id
                AND bl.organization_id = $1
                AND bl.status = 'COMPLETED'
                AND bl.deleted_at IS NULL
                AND bl.created_at >= b.bucket - ($5 || ' days')::interval
                AND bl.created_at < b.bucket + ${step}::interval
                AND ($4::uuid IS NULL OR bl.location_id = $4)
                AND ($6::uuid IS NULL OR EXISTS (
                  SELECT 1 FROM core.locations bill_loc WHERE bill_loc.id = bl.location_id AND bill_loc.branch_id = $6
                ))
                AND ($7::uuid[] IS NULL OR bl.location_id = ANY($7))
            ) THEN 'dead'
            ELSE 'normal'
          END AS status
        FROM buckets b
        CROSS JOIN inv i
      )
      SELECT
        ${labelExpr} AS period,
        COUNT(*) FILTER (WHERE status = 'normal') AS normal,
        COUNT(*) FILTER (WHERE status = 'low') AS low,
        COUNT(*) FILTER (WHERE status = 'out') AS out,
        COUNT(*) FILTER (WHERE status = 'over') AS over,
        COUNT(*) FILTER (WHERE status = 'dead') AS dead
      FROM classified
      GROUP BY bucket
      ORDER BY bucket
    `;

    const rows = await this.dataSource.query<RawRow[]>(sql, [
      query.organizationId,
      query.from,
      query.to,
      query.locationId ?? null,
      String(query.staleDays),
      query.branchId ?? null,
      query.locationIds ?? null,
    ]);

    return rows.map((row) => ({
      period: row.period,
      normal: Number(row.normal),
      low: Number(row.low),
      out: Number(row.out),
      over: Number(row.over),
      dead: Number(row.dead),
    }));
  }
}
