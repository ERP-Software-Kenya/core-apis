import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, IPageable, PageableFilter } from '../../../common';
import { ProductBranchPriceEntity } from '../entities';
import { ProductBranchPrice } from '../../../application/modules/product-branch-prices/domain';
import { IProductBranchPriceRepo } from 'src/application/modules/product-branch-prices';

interface RawPriceRow {
  productId:      string;
  productName:    string;
  sku:            string | null;
  id:             string | null;
  costPrice:      string | null;
  retailPrice:    string | null;
  loyaltyPrice:   string | null;
  wholesalePrice: string | null;
  transferPrice:  string | null;
}

@Injectable()
export class ProductBranchPriceRepo
  extends BaseRepo<ProductBranchPriceEntity, ProductBranchPrice, string, PageableFilter<ProductBranchPrice>, Filter<ProductBranchPrice>>
  implements IProductBranchPriceRepo
{
  constructor(
    @InjectRepository(ProductBranchPriceEntity) internalRepo: Repository<ProductBranchPriceEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(ProductBranchPriceRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, ProductBranchPriceEntity, ProductBranchPrice);
  }

  public override get idColumnName(): keyof ProductBranchPriceEntity {
    return 'id';
  }

  public override get softDeleteEnabled(): boolean {
    return false;
  }

  protected override mapToEntity(model: ProductBranchPrice): ProductBranchPriceEntity {
    const entity = new ProductBranchPriceEntity();
    entity.id             = model.id;
    entity.organizationId = model.organizationId;
    entity.branchId       = model.branchId;
    entity.productId      = model.productId;
    entity.costPrice      = model.costPrice ?? null;
    entity.retailPrice    = model.retailPrice ?? null;
    entity.loyaltyPrice   = model.loyaltyPrice ?? null;
    entity.wholesalePrice = model.wholesalePrice ?? null;
    entity.transferPrice  = model.transferPrice ?? null;
    return entity;
  }

  public async getByBranchAndProductAsync(branchId: string, productId: string): Promise<ProductBranchPrice | null> {
    const entity = await this.internalRepo.findOneBy({ branchId, productId });
    if (!entity) return null;
    return this.mapToModel(entity);
  }

  public async listByBranchAsync(
    branchId: string,
    organizationId: string,
    page: number,
    perPage: number,
    search?: string,
  ): Promise<IPageable<ProductBranchPrice>> {
    const offset = (page - 1) * perPage;
    const params: unknown[] = [organizationId, branchId];

    let searchClause = '';
    if (search) {
      params.push(`%${search}%`);
      searchClause = `AND (p.name ILIKE $${params.length} OR p.sku ILIKE $${params.length})`;
    }

    const baseWhere = `
      FROM core.products p
      LEFT JOIN core.product_branch_prices pbp
        ON pbp.product_id = p.id
       AND pbp.branch_id = $2
       AND pbp.organization_id = $1
      WHERE p.organization_id = $1
        AND p.deleted_at IS NULL
        ${searchClause}
    `;

    const countResult = await this.internalRepo.manager.query<Array<{ cnt: string }>>(
      `SELECT COUNT(*) AS cnt ${baseWhere}`,
      params,
    );
    const totalCount = parseInt(countResult[0]?.cnt ?? '0', 10);

    params.push(perPage, offset);
    const rows = await this.internalRepo.manager.query<RawPriceRow[]>(
      `SELECT
         p.id               AS "productId",
         p.name             AS "productName",
         p.sku              AS "sku",
         pbp.id             AS "id",
         pbp.cost_price     AS "costPrice",
         pbp.retail_price   AS "retailPrice",
         pbp.loyalty_price  AS "loyaltyPrice",
         pbp.wholesale_price AS "wholesalePrice",
         pbp.transfer_price  AS "transferPrice"
       ${baseWhere}
       ORDER BY p.name ASC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params,
    );

    return {
      items:      rows.map(this.fromRaw),
      page,
      perPage,
      totalCount,
      totalPages: Math.ceil(totalCount / perPage),
    };
  }

  public async upsertAsync(model: ProductBranchPrice): Promise<ProductBranchPrice> {
    const existing = await this.internalRepo.findOneBy({ branchId: model.branchId, productId: model.productId });
    if (existing) {
      existing.costPrice      = model.costPrice ?? null;
      existing.retailPrice    = model.retailPrice ?? null;
      existing.loyaltyPrice   = model.loyaltyPrice ?? null;
      existing.wholesalePrice = model.wholesalePrice ?? null;
      existing.transferPrice  = model.transferPrice ?? null;
      const saved = await this.internalRepo.save(existing);
      return this.mapToModel(saved);
    }
    const entity = this.mapToEntity(model);
    const saved  = await this.internalRepo.save(entity);
    return this.mapToModel(saved);
  }

  public async copyFromMainBranchAsync(targetBranchId: string, _mainBranchId: string, organizationId: string): Promise<void> {
    await this.internalRepo.manager.query(
      `INSERT INTO core.product_branch_prices
         (id, organization_id, branch_id, product_id,
          cost_price, retail_price, loyalty_price, wholesale_price, transfer_price,
          created_at)
       SELECT
         gen_random_uuid(), $1, $2, p.id,
         p.cost_price, p.retail_price, p.loyalty_price, p.wholesale_price, p.transfer_price,
         NOW()
       FROM core.products p
       WHERE p.organization_id = $1 AND p.deleted_at IS NULL
       ON CONFLICT (branch_id, product_id)
       DO UPDATE SET
         cost_price      = EXCLUDED.cost_price,
         retail_price    = EXCLUDED.retail_price,
         loyalty_price   = EXCLUDED.loyalty_price,
         wholesale_price = EXCLUDED.wholesale_price,
         transfer_price  = EXCLUDED.transfer_price,
         updated_at      = NOW()`,
      [organizationId, targetBranchId],
    );
  }

  private fromRaw(row: RawPriceRow): ProductBranchPrice {
    const model          = new ProductBranchPrice();
    model.id             = row.id ?? '';
    model.organizationId = '';
    model.branchId       = '';
    model.productId      = row.productId;
    model.productName    = row.productName;
    model.sku            = row.sku ?? undefined;
    model.costPrice      = row.costPrice      !== null ? Number(row.costPrice)      : null;
    model.retailPrice    = row.retailPrice    !== null ? Number(row.retailPrice)    : null;
    model.loyaltyPrice   = row.loyaltyPrice   !== null ? Number(row.loyaltyPrice)   : null;
    model.wholesalePrice = row.wholesalePrice !== null ? Number(row.wholesalePrice) : null;
    model.transferPrice  = row.transferPrice  !== null ? Number(row.transferPrice)  : null;
    return model;
  }
}
