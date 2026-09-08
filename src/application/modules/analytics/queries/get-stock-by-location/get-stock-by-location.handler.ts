import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetStockByLocationQuery } from './get-stock-by-location.query';
import { StockByLocationPointResponse } from '../../models';

interface RawStockByLocation {
  locationId: string;
  locationName: string;
  locationType: string;
  totalStock: string;
  productCount: string;
  valuation: string;
}

const STOCK_BY_LOCATION_SQL = `
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
    WHERE i.organization_id = $1
      AND i.created_at <= $2
  )
  SELECT
    l.id AS "locationId",
    l.name AS "locationName",
    l.type AS "locationType",
    COALESCE(SUM(i.snapshot_quantity), 0) AS "totalStock",
    COUNT(DISTINCT i.product_id) AS "productCount",
    COALESCE(SUM(i.snapshot_quantity * COALESCE(i.average_cost, 0)), 0) AS "valuation"
  FROM core.locations l
  LEFT JOIN scoped_inventory i ON i.location_id = l.id
  WHERE l.organization_id = $1 AND l.deleted_at IS NULL
    AND ($3::uuid IS NULL OR l.id = $3)
    AND ($4::uuid IS NULL OR l.branch_id = $4)
    AND ($5::uuid[] IS NULL OR l.id = ANY($5))
  GROUP BY l.id, l.name, l.type
  ORDER BY COALESCE(SUM(i.snapshot_quantity * COALESCE(i.average_cost, 0)), 0) DESC
`;

@QueryHandlerStrict(GetStockByLocationQuery)
export class GetStockByLocationHandler implements IQueryHandler<GetStockByLocationQuery, StockByLocationPointResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetStockByLocationHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetStockByLocationQuery): Promise<StockByLocationPointResponse[]> {
    this.logger.info(`Executing Query '${GetStockByLocationQuery.name}'`);
    const rows = await this.dataSource.query<RawStockByLocation[]>(STOCK_BY_LOCATION_SQL, [
      query.organizationId,
      query.to ?? new Date(),
      query.locationId ?? null,
      query.branchId ?? null,
      query.locationIds ?? null,
    ]);
    return rows.map((row) => ({
      locationId:   row.locationId,
      locationName: row.locationName,
      locationType: row.locationType,
      totalStock:   Number(row.totalStock),
      productCount: Number(row.productCount),
      valuation:    Number(row.valuation),
    }));
  }
}
