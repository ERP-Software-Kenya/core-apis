import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetPurchaseTrendQuery } from './get-purchase-trend.query';
import { PurchaseTrendPointResponse } from '../../models';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

interface RawPurchaseTrendRow {
  period: string;
  spend: string;
  poCount: string;
}

function formatExpr(trunc: string): string {
  if (trunc === 'hour') return `TO_CHAR(DATE_TRUNC('hour', created_at), 'YYYY-MM-DD HH24:00')`;
  if (trunc === 'day') return `TO_CHAR(DATE_TRUNC('day', created_at), 'YYYY-MM-DD')`;
  return `TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM')`;
}

@QueryHandlerStrict(GetPurchaseTrendQuery)
export class GetPurchaseTrendHandler implements IQueryHandler<GetPurchaseTrendQuery, PurchaseTrendPointResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetPurchaseTrendHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPurchaseTrendQuery): Promise<PurchaseTrendPointResponse[]> {
    this.logger.info(`Executing Query '${GetPurchaseTrendQuery.name}'`);

    const trunc = query.trunc ?? 'month';
    const labelExpr = formatExpr(trunc);
    const completedStatuses = [
      EPurchaseOrderStatus.Received,
      EPurchaseOrderStatus.PartiallyAllocated,
      EPurchaseOrderStatus.Allocated,
    ];
    const sql = `
      SELECT
        ${labelExpr} AS period,
        COALESCE(SUM(total_amount), 0) AS spend,
        COUNT(*) AS "poCount"
      FROM core.purchase_orders po
      WHERE organization_id = $1
        AND status::text = ANY($2::text[])
        AND created_at >= $3
        AND created_at <= $4
        AND (
          $5::uuid IS NULL AND $6::uuid IS NULL AND $7::uuid[] IS NULL
          OR EXISTS (
            SELECT 1
            FROM core.purchase_items pi
            INNER JOIN core.purchase_item_allocations pia ON pia.purchase_item_id = pi.id
            INNER JOIN core.locations l ON l.id = pia.location_id
            WHERE pi.purchase_order_id = po.id
              AND ($5::uuid IS NULL OR pia.location_id = $5)
              AND ($6::uuid IS NULL OR l.branch_id = $6)
              AND ($7::uuid[] IS NULL OR pia.location_id = ANY($7))
          )
        )
      GROUP BY DATE_TRUNC('${trunc}', created_at)
      ORDER BY DATE_TRUNC('${trunc}', created_at)
    `;

    const rows = await this.dataSource.query<RawPurchaseTrendRow[]>(sql, [
      query.organizationId,
      completedStatuses,
      query.from!,
      query.to!,
      query.locationId ?? null,
      query.branchId ?? null,
      query.locationIds ?? null,
    ]);

    return rows.map((row) => ({
      month: row.period,
      spend: Number(row.spend),
      poCount: Number(row.poCount),
    }));
  }
}
