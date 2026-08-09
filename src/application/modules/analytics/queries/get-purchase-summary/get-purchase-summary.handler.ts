import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetPurchaseSummaryQuery } from './get-purchase-summary.query';
import { PurchaseSummaryResponse } from '../../models/responses/purchase-summary.response';

interface RawPurchaseSummary {
  spendThisMonth: string;
  outstandingPos: string;
  avgPoValue: string;
  supplierCount: string;
}

const PURCHASE_SUMMARY_SQL = `
  SELECT
    COALESCE(SUM(CASE WHEN DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW())
      AND status = 'received' THEN total_amount ELSE 0 END), 0) AS "spendThisMonth",
    COUNT(CASE WHEN status IN ('ordered', 'partially_received') THEN 1 END) AS "outstandingPos",
    COALESCE(AVG(CASE WHEN status = 'received' THEN total_amount END), 0) AS "avgPoValue",
    COUNT(DISTINCT supplier_id) AS "supplierCount"
  FROM core.purchase_orders
  WHERE organization_id = $1
`;

@QueryHandlerStrict(GetPurchaseSummaryQuery)
export class GetPurchaseSummaryHandler implements IQueryHandler<GetPurchaseSummaryQuery, PurchaseSummaryResponse> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetPurchaseSummaryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPurchaseSummaryQuery): Promise<PurchaseSummaryResponse> {
    this.logger.info(`Executing Query '${GetPurchaseSummaryQuery.name}'`);
    const [summary] = await this.dataSource.query<RawPurchaseSummary[]>(PURCHASE_SUMMARY_SQL, [query.organizationId]);
    return {
      spendThisMonth: Number(summary.spendThisMonth),
      outstandingPos: Number(summary.outstandingPos),
      avgPoValue:     Number(summary.avgPoValue),
      supplierCount:  Number(summary.supplierCount),
    };
  }
}
