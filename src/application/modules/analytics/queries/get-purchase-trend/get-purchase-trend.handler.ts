import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetPurchaseTrendQuery } from './get-purchase-trend.query';
import { PurchaseTrendPointResponse } from '../../models';

interface RawPurchaseTrendRow {
  month: string;
  spend: string;
  poCount: string;
}

const PURCHASE_TREND_SQL = `
  SELECT
    TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') AS month,
    COALESCE(SUM(total_amount), 0) AS spend,
    COUNT(*) AS "poCount"
  FROM core.purchase_orders
  WHERE organization_id = $1
    AND status = 'received'
    AND created_at >= $2
  GROUP BY DATE_TRUNC('month', created_at)
  ORDER BY DATE_TRUNC('month', created_at)
`;

@QueryHandlerStrict(GetPurchaseTrendQuery)
export class GetPurchaseTrendHandler implements IQueryHandler<GetPurchaseTrendQuery, PurchaseTrendPointResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetPurchaseTrendHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPurchaseTrendQuery): Promise<PurchaseTrendPointResponse[]> {
    this.logger.info(`Executing Query '${GetPurchaseTrendQuery.name}'`);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - (query.months - 1));
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    const rows = await this.dataSource.query<RawPurchaseTrendRow[]>(PURCHASE_TREND_SQL, [query.organizationId, startDate]);
    return rows.map(row => ({
      month:   row.month,
      spend:   Number(row.spend),
      poCount: Number(row.poCount),
    }));
  }
}
