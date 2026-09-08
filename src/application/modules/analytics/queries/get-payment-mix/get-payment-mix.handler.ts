import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetPaymentMixQuery } from './get-payment-mix.query';
import { PaymentMixPointResponse } from '../../models';

interface RawRow {
  method: string;
  amount: string;
}

const SQL = `
  SELECT
    CASE
      WHEN LOWER(COALESCE(payment_method::text, '')) = 'cash' THEN 'Cash'
      WHEN LOWER(COALESCE(payment_method::text, '')) = 'credit' THEN 'Credit'
      WHEN LOWER(COALESCE(payment_method::text, '')) IN ('net_banking', 'card', 'cheque') THEN 'Bank'
      WHEN LOWER(COALESCE(payment_method::text, '')) = 'upi' THEN 'M-Pesa'
      ELSE 'Other'
    END AS method,
    COALESCE(SUM(total_amount), 0) AS amount
  FROM core.bills
  WHERE organization_id = $1
    AND status = 'COMPLETED'
    AND deleted_at IS NULL
    AND created_at >= $2
    AND created_at <= $3
    AND ($4::uuid IS NULL OR location_id = $4)
    AND ($5::uuid IS NULL OR EXISTS (
      SELECT 1 FROM core.locations l WHERE l.id = location_id AND l.branch_id = $5
    ))
    AND ($6::uuid[] IS NULL OR location_id = ANY($6))
  GROUP BY 1
  HAVING COALESCE(SUM(total_amount), 0) > 0
  ORDER BY amount DESC
`;

@QueryHandlerStrict(GetPaymentMixQuery)
export class GetPaymentMixHandler implements IQueryHandler<GetPaymentMixQuery, PaymentMixPointResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetPaymentMixHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPaymentMixQuery): Promise<PaymentMixPointResponse[]> {
    this.logger.info(`Executing Query '${GetPaymentMixQuery.name}'`);
    const rows = await this.dataSource.query<RawRow[]>(SQL, [
      query.organizationId,
      query.from,
      query.to,
      query.locationId ?? null,
      query.branchId ?? null,
      query.locationIds ?? null,
    ]);
    return rows.map((row) => ({
      method: row.method,
      amount: Number(row.amount),
    }));
  }
}
