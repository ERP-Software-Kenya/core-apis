import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetPurchaseSummaryQuery } from './get-purchase-summary.query';
import { PurchaseSummaryResponse } from '../../models';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

interface RawPurchaseSummary {
  spendInPeriod: string;
  outstandingPos: string;
  avgPoValue: string;
  supplierCount: string;
}

@QueryHandlerStrict(GetPurchaseSummaryQuery)
export class GetPurchaseSummaryHandler implements IQueryHandler<GetPurchaseSummaryQuery, PurchaseSummaryResponse> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetPurchaseSummaryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPurchaseSummaryQuery): Promise<PurchaseSummaryResponse> {
    this.logger.info(`Executing Query '${GetPurchaseSummaryQuery.name}'`);

    const completedStatuses = [
      EPurchaseOrderStatus.Received,
      EPurchaseOrderStatus.PartiallyAllocated,
      EPurchaseOrderStatus.Allocated,
    ];

    const sql = `
      SELECT
        COALESCE(SUM(CASE WHEN status::text = ANY($2::text[]) AND created_at >= $3 AND created_at <= $4 THEN total_amount ELSE 0 END), 0) AS "spendInPeriod",
        COUNT(CASE WHEN status IN ('ordered', 'partially_received') THEN 1 END) AS "outstandingPos",
        COALESCE(AVG(CASE WHEN status::text = ANY($2::text[]) THEN total_amount END), 0) AS "avgPoValue",
        COUNT(DISTINCT CASE WHEN status::text = ANY($2::text[]) AND created_at >= $3 AND created_at <= $4 THEN supplier_id END) AS "supplierCount"
      FROM core.purchase_orders po
      WHERE organization_id = $1
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
    `;

    const [summary] = await this.dataSource.query<RawPurchaseSummary[]>(sql, [
      query.organizationId,
      completedStatuses,
      query.from,
      query.to,
      query.locationId ?? null,
      query.branchId ?? null,
      query.locationIds ?? null,
    ]);
    const spend = Number(summary.spendInPeriod);
    return {
      spendThisMonth: spend,
      outstandingPos: Number(summary.outstandingPos),
      avgPoValue: Number(summary.avgPoValue),
      supplierCount: Number(summary.supplierCount),
    };
  }
}
