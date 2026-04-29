// Standard barrel file
export * from './categories.seed';
export * from './default-organization.seed';
export * from './inventory.seed';
export * from './products.seed';
export * from './purchase-orders.seed';
export * from './roles.seed';
export * from './seeding.service';
export * from './stores.seed';
export * from './suppliers.seed';
export * from "./seeding.service";

import { SeedingService } from "./seeding.service";
import { CategoriesSeed } from "./categories.seed";
import { DefaultOrganizationSeed } from "./default-organization.seed";
import { InventorySeed } from "./inventory.seed";
import { ProductsSeed } from "./products.seed";
import { PurchaseOrdersSeed } from "./purchase-orders.seed";
import { RolesSeed } from "./roles.seed";
import { StoresSeed } from "./stores.seed";
import { SuppliersSeed } from "./suppliers.seed";

export default [SeedingService,CategoriesSeed,DefaultOrganizationSeed,InventorySeed,ProductsSeed,PurchaseOrdersSeed,RolesSeed,StoresSeed,SuppliersSeed];
