import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetInventoryStatusQuery } from './get-inventory-status.query';
import { InventoryStatusResponse } from '../../models';

interface RawRow {
  normal: string;
  low: string;
  out: string;
  over: string;
  dead: string;
}

@QueryHandlerStrict(GetInventoryStatusQuery)
export class GetInventoryStatusHandler implements IQueryHandler<GetInventoryStatusQuery, InventoryStatusResponse> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetInventoryStatusHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetInventoryStatusQuery): Promise<InventoryStatusResponse> {
    this.logger.info(`Executing Query '${GetInventoryStatusQuery.name}'`);

    const sql = `
      WITH rows AS (
        SELECT
          i.product_id,
          COALESCE((
            SELECT sm.quantity_after
            FROM core.stock_movements sm
            WHERE sm.inventory_id = i.id
              AND sm.created_at <= $3
            ORDER BY sm.created_at DESC
            LIMIT 1
          ), i.quantity_on_hand) AS quantity_on_hand,
          i.reorder_level,
          i.max_stock,
          CASE
            WHEN COALESCE((
              SELECT sm.quantity_after FROM core.stock_movements sm WHERE sm.inventory_id = i.id AND sm.created_at <= $3 ORDER BY sm.created_at DESC LIMIT 1
            ), i.quantity_on_hand) = 0 THEN 'out'
            WHEN i.reorder_level > 0 AND COALESCE((
              SELECT sm.quantity_after FROM core.stock_movements sm WHERE sm.inventory_id = i.id AND sm.created_at <= $3 ORDER BY sm.created_at DESC LIMIT 1
            ), i.quantity_on_hand) < i.reorder_level THEN 'low'
            WHEN i.max_stock IS NOT NULL AND i.max_stock > 0 AND COALESCE((
              SELECT sm.quantity_after FROM core.stock_movements sm WHERE sm.inventory_id = i.id AND sm.created_at <= $3 ORDER BY sm.created_at DESC LIMIT 1
            ), i.quantity_on_hand) > i.max_stock THEN 'over'
            WHEN COALESCE((
              SELECT sm.quantity_after FROM core.stock_movements sm WHERE sm.inventory_id = i.id AND sm.created_at <= $3 ORDER BY sm.created_at DESC LIMIT 1
            ), i.quantity_on_hand) > 0 AND NOT EXISTS (
              SELECT 1 FROM core.bill_items bi
              JOIN core.bills b ON b.id = bi.bill_id
              WHERE bi.product_id = i.product_id
                AND b.organization_id = $1
                AND b.status = 'COMPLETED'
                AND b.deleted_at IS NULL
                AND b.created_at >= $3::timestamp - ($6 || ' days')::interval
                AND b.created_at <= $3
                AND ($2::uuid IS NULL OR b.location_id = $2)
                AND ($4::uuid IS NULL OR EXISTS (
                  SELECT 1 FROM core.locations bl WHERE bl.id = b.location_id AND bl.branch_id = $4
                ))
                AND ($5::uuid[] IS NULL OR b.location_id = ANY($5))
            ) THEN 'dead'
            ELSE 'normal'
          END AS status
        FROM core.inventory i
        INNER JOIN core.locations l ON l.id = i.location_id
        WHERE i.organization_id = $1
          AND i.created_at <= $3
          AND ($2::uuid IS NULL OR i.location_id = $2)
          AND ($4::uuid IS NULL OR l.branch_id = $4)
          AND ($5::uuid[] IS NULL OR i.location_id = ANY($5))
      )
      SELECT
        COUNT(CASE WHEN status = 'normal' THEN 1 END) AS normal,
        COUNT(CASE WHEN status = 'low' THEN 1 END) AS low,
        COUNT(CASE WHEN status = 'out' THEN 1 END) AS out,
        COUNT(CASE WHEN status = 'over' THEN 1 END) AS over,
        COUNT(CASE WHEN status = 'dead' THEN 1 END) AS dead
      FROM rows
    `;

    const [row] = await this.dataSource.query<RawRow[]>(sql, [
      query.organizationId,
      query.locationId ?? null,
      query.to ?? new Date(),
      query.branchId ?? null,
      query.locationIds ?? null,
      String(query.staleDays),
    ]);

    return {
      normal: Number(row?.normal ?? 0),
      low: Number(row?.low ?? 0),
      out: Number(row?.out ?? 0),
      over: Number(row?.over ?? 0),
      dead: Number(row?.dead ?? 0),
    };
  }
}
