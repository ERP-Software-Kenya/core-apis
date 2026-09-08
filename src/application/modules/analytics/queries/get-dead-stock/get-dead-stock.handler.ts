import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetDeadStockQuery } from './get-dead-stock.query';
import { ProductMovementRankResponse } from '../../models';

interface RawRow {
  productId: string;
  productName: string;
  quantity: string;
  value: string;
}

@QueryHandlerStrict(GetDeadStockQuery)
export class GetDeadStockHandler implements IQueryHandler<GetDeadStockQuery, ProductMovementRankResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetDeadStockHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetDeadStockQuery): Promise<ProductMovementRankResponse[]> {
    this.logger.info(`Executing Query '${GetDeadStockQuery.name}'`);

    const sql = `
      WITH scoped_inventory AS (
        SELECT
          i.*,
          COALESCE((
            SELECT sm.quantity_after
            FROM core.stock_movements sm
            WHERE sm.inventory_id = i.id
              AND sm.created_at <= $3
            ORDER BY sm.created_at DESC
            LIMIT 1
          ), i.quantity_on_hand) AS snapshot_quantity
        FROM core.inventory i
        INNER JOIN core.locations l ON l.id = i.location_id
        WHERE i.organization_id = $1
          AND i.created_at <= $3
          AND ($2::uuid IS NULL OR i.location_id = $2)
          AND ($5::uuid IS NULL OR l.branch_id = $5)
          AND ($6::uuid[] IS NULL OR i.location_id = ANY($6))
      )
      SELECT
        p.id AS "productId",
        p.name AS "productName",
        COALESCE(SUM(i.snapshot_quantity), 0) AS quantity,
        COALESCE(SUM(i.snapshot_quantity * COALESCE(i.average_cost, 0)), 0) AS value
      FROM scoped_inventory i
      JOIN core.products p ON p.id = i.product_id
      WHERE i.snapshot_quantity > 0
        AND NOT EXISTS (
          SELECT 1
          FROM core.bill_items bi
          JOIN core.bills b ON b.id = bi.bill_id
          WHERE bi.product_id = i.product_id
            AND b.organization_id = $1
            AND b.status = 'COMPLETED'
            AND b.deleted_at IS NULL
            AND b.created_at >= $3::timestamp - ($4 || ' days')::interval
            AND b.created_at <= $3
            AND ($2::uuid IS NULL OR b.location_id = $2)
            AND ($5::uuid IS NULL OR EXISTS (
              SELECT 1 FROM core.locations bl WHERE bl.id = b.location_id AND bl.branch_id = $5
            ))
            AND ($6::uuid[] IS NULL OR b.location_id = ANY($6))
        )
      GROUP BY p.id, p.name
      ORDER BY value DESC
      LIMIT $7
    `;

    const rows = await this.dataSource.query<RawRow[]>(sql, [
      query.organizationId,
      query.locationId ?? null,
      query.to ?? new Date(),
      String(query.staleDays),
      query.branchId ?? null,
      query.locationIds ?? null,
      query.limit,
    ]);

    return rows.map((r) => ({
      productId: r.productId,
      productName: r.productName,
      quantity: Number(r.quantity),
      value: Number(r.value),
    }));
  }
}
