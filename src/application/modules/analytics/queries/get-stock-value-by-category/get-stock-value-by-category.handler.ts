import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetStockValueByCategoryQuery } from './get-stock-value-by-category.query';
import { CategoryValuePointResponse } from '../../models';

interface RawRow {
  categoryId: string | null;
  categoryName: string;
  value: string;
}

const SQL = `
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
    c.id AS "categoryId",
    COALESCE(c.name, 'Uncategorized') AS "categoryName",
    COALESCE(SUM(i.snapshot_quantity * COALESCE(i.average_cost, 0)), 0) AS value
  FROM scoped_inventory i
  JOIN core.products p ON p.id = i.product_id
  LEFT JOIN core.categories c ON c.id = p.category_id
  GROUP BY c.id, c.name
  HAVING COALESCE(SUM(i.snapshot_quantity * COALESCE(i.average_cost, 0)), 0) > 0
  ORDER BY value DESC
`;

@QueryHandlerStrict(GetStockValueByCategoryQuery)
export class GetStockValueByCategoryHandler
  implements IQueryHandler<GetStockValueByCategoryQuery, CategoryValuePointResponse[]>
{
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetStockValueByCategoryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetStockValueByCategoryQuery): Promise<CategoryValuePointResponse[]> {
    this.logger.info(`Executing Query '${GetStockValueByCategoryQuery.name}'`);
    const rows = await this.dataSource.query<RawRow[]>(SQL, [
      query.organizationId,
      query.to ?? new Date(),
      query.locationId ?? null,
      query.branchId ?? null,
      query.locationIds ?? null,
    ]);
    return rows.map((row) => ({
      categoryId: row.categoryId ?? undefined,
      categoryName: row.categoryName,
      value: Number(row.value),
    }));
  }
}
