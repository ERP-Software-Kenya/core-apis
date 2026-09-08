import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetTopSuppliersQuery } from './get-top-suppliers.query';
import { TopSupplierResponse } from '../../models';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

interface RawTopSupplier {
  supplierId: string;
  supplierName: string;
  totalSpend: string;
  poCount: string;
}

const TOP_SUPPLIERS_SQL = `
  SELECT
    po.supplier_id AS "supplierId",
    s.name AS "supplierName",
    COALESCE(SUM(po.total_amount), 0) AS "totalSpend",
    COUNT(po.id) AS "poCount"
  FROM core.purchase_orders po
  JOIN core.suppliers s ON po.supplier_id = s.id
  WHERE po.organization_id = $1
    AND po.status::text = ANY($2::text[])
    AND po.created_at >= $3
    AND po.created_at <= $4
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
  GROUP BY po.supplier_id, s.name
  ORDER BY SUM(po.total_amount) DESC
  LIMIT $8
`;

@QueryHandlerStrict(GetTopSuppliersQuery)
export class GetTopSuppliersHandler implements IQueryHandler<GetTopSuppliersQuery, TopSupplierResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetTopSuppliersHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetTopSuppliersQuery): Promise<TopSupplierResponse[]> {
    this.logger.info(`Executing Query '${GetTopSuppliersQuery.name}'`);
    const completedStatuses = [
      EPurchaseOrderStatus.Received,
      EPurchaseOrderStatus.PartiallyAllocated,
      EPurchaseOrderStatus.Allocated,
    ];
    const rows = await this.dataSource.query<RawTopSupplier[]>(TOP_SUPPLIERS_SQL, [
      query.organizationId,
      completedStatuses,
      query.from,
      query.to,
      query.locationId ?? null,
      query.branchId ?? null,
      query.locationIds ?? null,
      query.limit,
    ]);
    return rows.map(row => ({
      supplierId:   row.supplierId,
      supplierName: row.supplierName,
      totalSpend:   Number(row.totalSpend),
      poCount:      Number(row.poCount),
    }));
  }
}
