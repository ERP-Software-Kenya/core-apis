import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from 'src/common';
import { GetTopProductsQuery } from './get-top-products.query';
import { TopProductResponse } from '../../models';

interface RawTopProduct {
  productId: string;
  productName: string;
  totalRevenue: string;
  totalQtySold: string;
}

const TOP_PRODUCTS_SQL = `
  SELECT
    bi.product_id AS "productId",
    p.name AS "productName",
    COALESCE(SUM(bi.line_total), 0) AS "totalRevenue",
    COALESCE(SUM(bi.quantity), 0) AS "totalQtySold"
  FROM core.bill_items bi
  JOIN core.bills b ON bi.bill_id = b.id
  JOIN core.products p ON bi.product_id = p.id
  WHERE b.organization_id = $1
    AND b.status = 'COMPLETED'
    AND b.deleted_at IS NULL
  GROUP BY bi.product_id, p.name
  ORDER BY SUM(bi.line_total) DESC
  LIMIT $2
`;

@QueryHandlerStrict(GetTopProductsQuery)
export class GetTopProductsHandler implements IQueryHandler<GetTopProductsQuery, TopProductResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetTopProductsHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetTopProductsQuery): Promise<TopProductResponse[]> {
    this.logger.info(`Executing Query '${GetTopProductsQuery.name}'`);
    const rows = await this.dataSource.query<RawTopProduct[]>(TOP_PRODUCTS_SQL, [query.organizationId, query.limit]);
    return rows.map(row => ({
      productId:    row.productId,
      productName:  row.productName,
      totalRevenue: Number(row.totalRevenue),
      totalQtySold: Number(row.totalQtySold),
    }));
  }
}
