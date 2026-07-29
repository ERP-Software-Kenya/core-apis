import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { RolesSeed } from './roles.seed';
import { DefaultOrganizationSeed } from './default-organization.seed';
import { StoresSeed } from './stores.seed';
import { CategoriesSeed } from './categories.seed';
import { ProductsSeed } from './products.seed';
import { SuppliersSeed } from './suppliers.seed';
import { InventorySeed } from './inventory.seed';
import { PurchaseOrdersSeed } from './purchase-orders.seed';

/**
 * Orchestrates all seeds in strict dependency order.
 * Seeds with no FK dependencies run first; org/user seeds before
 * store seeds, etc.
 */
@Injectable()
export class SeedingService {
  constructor(
    @InjectPinoLogger(SeedingService.name)
    protected readonly logger: PinoLogger,
    private readonly rolesSeed: RolesSeed,
    private readonly defaultOrganizationSeed: DefaultOrganizationSeed,
    private readonly storesSeed: StoresSeed,
    private readonly categoriesSeed: CategoriesSeed,
    private readonly productsSeed: ProductsSeed,
    private readonly suppliersSeed: SuppliersSeed,
    // private readonly inventorySeed: InventorySeed,
    // private readonly purchaseOrdersSeed: PurchaseOrdersSeed,
  ) {}

  public async runAsync(): Promise<void> {
    this.logger.info('Applying seeds...');
    // Tier 1 – no FK deps
    await this.rolesSeed.runAsync();
    await this.defaultOrganizationSeed.runAsync();  // creates org + super-admin user
    // Tier 2 – depend on org
    await this.storesSeed.runAsync();
    await this.categoriesSeed.runAsync();
    await this.suppliersSeed.runAsync();
    // Tier 3 – depend on org + category
    await this.productsSeed.runAsync();
    // Tier 4 – depend on store + product
    // await this.inventorySeed.runAsync();
    // await this.purchaseOrdersSeed.runAsync();
    this.logger.info('All seeds applied successfully');
  }
}
