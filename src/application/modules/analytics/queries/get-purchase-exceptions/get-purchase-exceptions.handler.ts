import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetPurchaseExceptionsQuery } from './get-purchase-exceptions.query';
import { PurchaseExceptionsResponse } from '../../models';

interface RawRow {
  pending: string;
  approvalPending: string;
}

interface RawPriceRow {
  priceIncreased: string;
}

// POs have no location_id; location lives on purchase_item_allocations.
const SQL = `
  SELECT
    COUNT(CASE WHEN status IN ('ordered', 'partially_received') THEN 1 END) AS pending,
    COUNT(CASE WHEN status = 'draft' THEN 1 END) AS "approvalPending"
  FROM core.purchase_orders po
  WHERE po.organization_id = $1
    AND po.created_at >= $2
    AND po.created_at <= $3
    AND (
      $4::uuid IS NULL AND $5::uuid IS NULL AND $6::uuid[] IS NULL
      OR EXISTS (
        SELECT 1
        FROM core.purchase_items pi
        INNER JOIN core.purchase_item_allocations pia ON pia.purchase_item_id = pi.id
        INNER JOIN core.locations l ON l.id = pia.location_id
        WHERE pi.purchase_order_id = po.id
          AND ($4::uuid IS NULL OR pia.location_id = $4)
          AND ($5::uuid IS NULL OR l.branch_id = $5)
          AND ($6::uuid[] IS NULL OR pia.location_id = ANY($6))
      )
    )
`;

const PRICE_INCREASED_SQL = `
  WITH po_costs AS (
    SELECT
      pi.unit_cost,
      LAG(pi.unit_cost) OVER (
        PARTITION BY pi.product_id, po.supplier_id ORDER BY po.created_at
      ) AS prev_cost
    FROM core.purchase_items pi
    JOIN core.purchase_orders po ON po.id = pi.purchase_order_id
    WHERE po.organization_id = $1
      AND po.status = 'received'
      AND po.created_at >= $2
      AND po.created_at <= $3
      AND (
        $4::uuid IS NULL AND $5::uuid IS NULL AND $6::uuid[] IS NULL
        OR EXISTS (
          SELECT 1
          FROM core.purchase_item_allocations pia
          INNER JOIN core.locations l ON l.id = pia.location_id
          WHERE pia.purchase_item_id = pi.id
            AND ($4::uuid IS NULL OR pia.location_id = $4)
            AND ($5::uuid IS NULL OR l.branch_id = $5)
            AND ($6::uuid[] IS NULL OR pia.location_id = ANY($6))
        )
      )
  )
  SELECT COUNT(*) AS "priceIncreased"
  FROM po_costs
  WHERE prev_cost IS NOT NULL AND unit_cost > prev_cost
`;

@QueryHandlerStrict(GetPurchaseExceptionsQuery)
export class GetPurchaseExceptionsHandler
  implements IQueryHandler<GetPurchaseExceptionsQuery, PurchaseExceptionsResponse>
{
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetPurchaseExceptionsHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPurchaseExceptionsQuery): Promise<PurchaseExceptionsResponse> {
    this.logger.info(`Executing Query '${GetPurchaseExceptionsQuery.name}'`);
    const params = [
      query.organizationId,
      query.from,
      query.to,
      query.locationId ?? null,
      query.branchId ?? null,
      query.locationIds ?? null,
    ];
    const [[row], [priceRow]] = await Promise.all([
      this.dataSource.query<RawRow[]>(SQL, params),
      this.dataSource.query<RawPriceRow[]>(PRICE_INCREASED_SQL, params),
    ]);
    return {
      pending: Number(row?.pending ?? 0),
      approvalPending: Number(row?.approvalPending ?? 0),
      priceIncreased: Number(priceRow?.priceIncreased ?? 0),
    };
  }
}
