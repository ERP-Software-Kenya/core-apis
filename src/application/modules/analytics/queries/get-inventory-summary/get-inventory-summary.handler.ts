import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetInventorySummaryQuery } from './get-inventory-summary.query';
import { InventorySummaryResponse } from '../../models';

interface RawInventorySummary {
  totalSkus: string;
  lowStockCount: string;
  zeroStockCount: string;
  totalValuation: string;
}

const INVENTORY_SUMMARY_SQL = `
  WITH scoped_inventory AS (
    SELECT
      i.*,
      COALESCE((
        SELECT sm.quantity_after
        FROM core.stock_movements sm
        WHERE sm.inventory_id = i.id
          AND sm.created_at <= $2
        ORDER BY sm.created_at DESC
        LIMIT 1
      ), i.quantity_on_hand) AS snapshot_quantity
    FROM core.inventory i
    INNER JOIN core.locations l ON l.id = i.location_id
    WHERE i.organization_id = $1
      AND i.created_at <= $2
      AND ($3::uuid IS NULL OR i.location_id = $3)
      AND ($4::uuid IS NULL OR l.branch_id = $4)
      AND ($5::uuid[] IS NULL OR i.location_id = ANY($5))
  )
  SELECT
    COUNT(*) AS "totalSkus",
    COUNT(CASE WHEN snapshot_quantity < reorder_level AND reorder_level > 0 THEN 1 END) AS "lowStockCount",
    COUNT(CASE WHEN snapshot_quantity = 0 THEN 1 END) AS "zeroStockCount",
    COALESCE(SUM(snapshot_quantity * COALESCE(average_cost, 0)), 0) AS "totalValuation"
  FROM scoped_inventory
`;

@QueryHandlerStrict(GetInventorySummaryQuery)
export class GetInventorySummaryHandler implements IQueryHandler<GetInventorySummaryQuery, InventorySummaryResponse> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetInventorySummaryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetInventorySummaryQuery): Promise<InventorySummaryResponse> {
    this.logger.info(`Executing Query '${GetInventorySummaryQuery.name}'`);
    const [summary] = await this.dataSource.query<RawInventorySummary[]>(INVENTORY_SUMMARY_SQL, [
      query.organizationId,
      query.to ?? new Date(),
      query.locationId ?? null,
      query.branchId ?? null,
      query.locationIds ?? null,
    ]);
    return {
      totalSkus: Number(summary.totalSkus),
      lowStockCount: Number(summary.lowStockCount),
      zeroStockCount: Number(summary.zeroStockCount),
      totalValuation: Number(summary.totalValuation),
    };
  }
}
