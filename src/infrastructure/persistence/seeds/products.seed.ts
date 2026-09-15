import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository } from "typeorm";
import { DataSource } from "typeorm";
import { BaseSeed } from "../../../common";
import { ProductEntity } from "../entities";
import { ITEM_LIST_PRODUCT_SEED_ROWS } from "./data/item-list-products.seed-data";

const PRODUCT_SEED_ORGANIZATION_ID = "00000000-0000-4000-8000-000000000001";
const PRODUCT_SEED_CREATED_BY_ID = "00000000-0000-4000-8000-000000000002";

@Injectable()
export class ProductsSeed extends BaseSeed<ProductEntity> {
  public get version(): number {
    return 2;
  }

  public get seedingData(): Partial<ProductEntity>[] {
    return ITEM_LIST_PRODUCT_SEED_ROWS.map((row) => {
      const price = row.retailPrice;
      return {
        organizationId: PRODUCT_SEED_ORGANIZATION_ID,
        categoryId: row.categoryId,
        createdById: PRODUCT_SEED_CREATED_BY_ID,
        name: row.name,
        sku: row.sku,
        description: row.description,
        unit: row.unit,
        manufacturer: row.manufacturer,
        costPrice: 0,
        retailPrice: price,
        loyaltyPrice: price,
        wholesalePrice: price,
        transferPrice: price,
        reorderPoint: 0,
        packSize: row.packSize,
        isActive: true,
      };
    });
  }

  constructor(dataSource: DataSource, @InjectRepository(ProductEntity) repo: Repository<ProductEntity>, @InjectPinoLogger(ProductsSeed.name) logger: PinoLogger) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<ProductEntity>, y: Partial<ProductEntity>): boolean {
    return x.sku === y.sku && x.organizationId === y.organizationId;
  }

  protected createFilter(): FindOptionsWhere<ProductEntity> {
    return { organizationId: PRODUCT_SEED_ORGANIZATION_ID };
  }
}
