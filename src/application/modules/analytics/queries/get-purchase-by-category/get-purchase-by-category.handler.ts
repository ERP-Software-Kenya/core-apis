import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetPurchaseByCategoryQuery } from './get-purchase-by-category.query';
import { CategoryValuePointResponse } from '../../models';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

interface RawRow {
  categoryId: string | null;
  categoryName: string;
  value: string;
}

// POs have no location_id; location lives on purchase_item_allocations.
const SQL = `
  SELECT
    c.id AS "categoryId",
    COALESCE(c.name, 'Uncategorized') AS "categoryName",
    COALESCE(SUM(pi.total_cost), 0) AS value
  FROM core.purchase_items pi
  JOIN core.purchase_orders po ON po.id = pi.purchase_order_id
  JOIN core.products p ON p.id = pi.product_id
  LEFT JOIN core.categories c ON c.id = p.category_id
  WHERE po.organization_id = $1
    AND po.status::text = ANY($5::text[])
    AND po.created_at >= $2
    AND po.created_at <= $3
    AND (
      $4::uuid IS NULL AND $6::uuid IS NULL AND $7::uuid[] IS NULL
      OR EXISTS (
        SELECT 1
        FROM core.purchase_item_allocations pia
        INNER JOIN core.locations l ON l.id = pia.location_id
        WHERE pia.purchase_item_id = pi.id
          AND ($4::uuid IS NULL OR pia.location_id = $4)
          AND ($6::uuid IS NULL OR l.branch_id = $6)
          AND ($7::uuid[] IS NULL OR pia.location_id = ANY($7))
      )
    )
  GROUP BY c.id, c.name
  HAVING COALESCE(SUM(pi.total_cost), 0) > 0
  ORDER BY value DESC
`;

@QueryHandlerStrict(GetPurchaseByCategoryQuery)
export class GetPurchaseByCategoryHandler
  implements IQueryHandler<GetPurchaseByCategoryQuery, CategoryValuePointResponse[]>
{
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetPurchaseByCategoryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPurchaseByCategoryQuery): Promise<CategoryValuePointResponse[]> {
    this.logger.info(`Executing Query '${GetPurchaseByCategoryQuery.name}'`);
    const completedStatuses = [
      EPurchaseOrderStatus.Received,
      EPurchaseOrderStatus.PartiallyAllocated,
      EPurchaseOrderStatus.Allocated,
    ];
    const rows = await this.dataSource.query<RawRow[]>(SQL, [
      query.organizationId,
      query.from,
      query.to,
      query.locationId ?? null,
      completedStatuses,
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
