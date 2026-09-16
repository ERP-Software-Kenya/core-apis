import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository } from "typeorm";
import { DataSource } from "typeorm";
import { BaseSeed } from "../../../common";
import { CategoryEntity } from "../entities";
import { ITEM_LIST_CATEGORY_SEED_ROWS } from "./data/item-list-categories.seed-data";
import { SEED_ORG_ID } from "./seed.constants";

@Injectable()
export class CategoriesSeed extends BaseSeed<CategoryEntity> {
  public get version(): number {
    return 5;
  }

  public get seedingData(): Partial<CategoryEntity>[] {
    return ITEM_LIST_CATEGORY_SEED_ROWS.map((category) => ({
      id: category.id,
      organizationId: SEED_ORG_ID,
      name: category.name,
      description: category.description,
      parentId: category.parentId,
      isActive: true,
    }));
  }

  constructor(dataSource: DataSource, @InjectRepository(CategoryEntity) repo: Repository<CategoryEntity>, @InjectPinoLogger(CategoriesSeed.name) logger: PinoLogger) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<CategoryEntity>, y: Partial<CategoryEntity>): boolean {
    return x.id === y.id && x.organizationId === y.organizationId;
  }

  protected createFilter(): FindOptionsWhere<CategoryEntity> {
    return { organizationId: SEED_ORG_ID };
  }
}
