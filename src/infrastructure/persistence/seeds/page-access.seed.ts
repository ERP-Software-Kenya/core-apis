import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import { BaseSeed } from "../../../common";
import { ERole, PageAccessEntity } from "../entities";

const VERSION = 1;

const PAGE_ACCESS_KEYS = [
  "dashboard",
  "dashboard-sales",
  "dashboard-purchase",
  "dashboard-inventory",
  "pos-sales",
  "sales-list",
  "pending-approvals",
  "customers",
  "debtors",
  "creditors",
  "orders",
  "sales-returns",
  "purchase-billing",
  "suppliers",
  "purchase-creditors",
  "purchase-orders",
  "purchase-returns",
  "bills",
  "debtors-ac",
  "creditors-ac",
  "inventory",
  "stock-movements",
  "stock-transfers",
  "stock-requests",
  "unpublished-stock",
  "black-sale",
  "black-ledger",
  "black-stock-reports",
  "products",
  "categories",
  "product-logs",
  "branches",
  "stores",
  "warehouses",
  "warehouse-packing",
  "fleet-dashboard",
  "fleet-vehicles",
  "fleet-drivers",
  "fleet-trips",
  "fleet-maintenance",
  "fleet-expenses",
  "fleet-dispatch",
  "fleet-live-map",
  "approvals-pending",
  "approvals-history",
  "report-generation-logs",
  "users",
  "roles",
  "organizations",
  "activity-logs",
  "expenses",
  "page-access",
  "settings-app-updates",
  "settings-billing",
  "settings-notifications",
] as const;

@Injectable()
export class PageAccessSeed extends BaseSeed<PageAccessEntity> {
  public get version(): number {
    return VERSION;
  }

  public get seedingData(): Partial<PageAccessEntity>[] {
    const allowedRoles = Object.values(ERole);
    return PAGE_ACCESS_KEYS.map((pageKey) => ({
      pageKey,
      allowedRoles,
    }));
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(PageAccessEntity) repo: Repository<PageAccessEntity>,
    @InjectPinoLogger(PageAccessSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected override async writeDataAsync(data: Partial<PageAccessEntity>[]): Promise<void> {
    await this.repo.upsert(data, {
      conflictPaths: ["pageKey"],
      skipUpdateIfNoValuesChanged: true,
    });
    await this.updateSeedEntityAsync();
    this.logger.info(`Seeding ${this.name} finished`);
  }

  protected equalityCheck(x: Partial<PageAccessEntity>, y: Partial<PageAccessEntity>): boolean {
    return x.pageKey === y.pageKey;
  }

  protected createFilter(): FindOptionsWhere<PageAccessEntity> {
    return {};
  }
}
