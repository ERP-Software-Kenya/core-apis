/**
 * End-to-end branch + stock flow runner (no Jest — avoids ESM/typeorm issues).
 * Run: npx ts-node -r tsconfig-paths/register src/test/e2e-branch-stock-flow.runner.ts
 */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { CqrsMediator } from '../common';
import { assertLocationAccess } from '../common/auth/location-access.util';
import { AuthenticatedUser } from '../common/auth/types/authenticated-user';
import { INVENTORY_REPO } from '../application/constants';
import { CreateBranchCommand } from '../application/modules/branches/commands/create-branch/create-branch.command';
import { Branch } from '../application/modules/branches/domain';
import { CreateInventoryCommand } from '../application/modules/inventory/commands/create-inventory/create-inventory.command';
import { Inventory, IInventoryRepo } from '../application/modules/inventory';
import { AddStockCommand } from '../application/modules/stock-movements/commands/add-stock/add-stock.command';
import { CreateBillCommand, CreateBillItemCommand } from '../application/modules/bills/commands/create-bill/create-bill.command';
import { TransitionBillStatusCommand } from '../application/modules/bills/commands/transition-bill-status/transition-bill-status.command';
import { Bill } from '../application/modules/bills/domain';
import { CreateLocationCommand } from '../application/modules/locations/commands/create-location/create-location.command';
import { Location } from '../application/modules/locations/domain';
import { CreateProductCommand } from '../application/modules/products/commands/create-product/create-product.command';
import { Product } from '../application/modules/products/domain';
import { CreateUserRoleCommand } from '../application/modules/user-roles/commands/create-user-role/create-user-role.command';
import { UserRole } from '../application/modules/user-roles/domain';
import {
  EBillStatus,
  ELocationType,
  ERole,
  OrganizationEntity,
  RoleEntity,
  UserEntity,
} from '../infrastructure/persistence/entities';
import { EPaymentMethod } from '../infrastructure/persistence/entities/bill.entity';

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`FAIL: ${msg}`);
}

function assertThrows(fn: () => void, msg: string): void {
  try {
    fn();
    throw new Error(`FAIL: expected throw — ${msg}`);
  } catch (e) {
    if (e instanceof Error && e.message.startsWith('FAIL:')) throw e;
  }
}

async function main(): Promise<void> {
  const moduleRef = await NestFactory.createApplicationContext(AppModule.forRoot(), {
    bufferLogs: true,
  });
  const mediator = moduleRef.get(CqrsMediator);
  const dataSource = moduleRef.get(DataSource);
  const inventoryRepo = moduleRef.get<IInventoryRepo>(INVENTORY_REPO);

  console.log('→ Setup org, branches, locations, branch_manager role…');

  const org = await dataSource.getRepository(OrganizationEntity).save(
    dataSource.getRepository(OrganizationEntity).create({ name: `E2E Org ${Date.now()}`, isActive: true }),
  );

  const branchManagerRole = await dataSource.getRepository(RoleEntity).findOne({ where: { name: ERole.BranchManager } });
  assert(branchManagerRole, 'branch_manager role missing');

  const user = await dataSource.getRepository(UserEntity).save(
    dataSource.getRepository(UserEntity).create({
      email: `e2e-branch-${Date.now()}@test.local`,
      clerkUserId: `clerk_e2e_${Date.now()}`,
      organizationId: org.id,
      isActive: true,
    }),
  );

  const mainBranch = await mediator.execute<CreateBranchCommand, Branch>(Object.assign(new CreateBranchCommand(), {
    organizationId: org.id,
    name: 'Main Branch (seed)',
    locationIds: [],
  }));

  const storeA = await mediator.execute<CreateLocationCommand, Location>(Object.assign(new CreateLocationCommand(), {
    organizationId: org.id,
    branchId: mainBranch.id,
    name: 'E2E Store A',
    type: ELocationType.Store,
  }));

  const warehouseA = await mediator.execute<CreateLocationCommand, Location>(Object.assign(new CreateLocationCommand(), {
    organizationId: org.id,
    branchId: mainBranch.id,
    name: 'E2E Warehouse A',
    type: ELocationType.Warehouse,
  }));

  const branchA = await mediator.execute<CreateBranchCommand, Branch>(Object.assign(new CreateBranchCommand(), {
    organizationId: org.id,
    name: 'Ahmedabad Branch',
    locationIds: [storeA.id, warehouseA.id],
  }));

  const storeB = await mediator.execute<CreateLocationCommand, Location>(Object.assign(new CreateLocationCommand(), {
    organizationId: org.id,
    branchId: mainBranch.id,
    name: 'E2E Store B',
    type: ELocationType.Store,
  }));

  const branchB = await mediator.execute<CreateBranchCommand, Branch>(Object.assign(new CreateBranchCommand(), {
    organizationId: org.id,
    name: 'Surat Branch',
    locationIds: [storeB.id],
  }));

  await mediator.execute<CreateUserRoleCommand, UserRole>(Object.assign(new CreateUserRoleCommand(), {
    userId: user.id,
    roleId: branchManagerRole.id,
    branchId: branchA.id,
    organizationId: org.id,
    callerIsSuperAdmin: true,
  }));

  const product = await mediator.execute<CreateProductCommand, Product>(Object.assign(new CreateProductCommand(), {
    organizationId: org.id,
    name: `E2E Product ${Date.now()}`,
    sku: `E2E-${Date.now()}`,
    retailPrice: 100,
  }));

  const branchManagerUser = (locationIds: string[]): AuthenticatedUser => {
    const u = new AuthenticatedUser();
    u.dbUserId = user.id;
    u.organizationId = org.id;
    u.roles = [ERole.BranchManager];
    u.branchIds = [branchA.id];
    u.locationIds = locationIds;
    u.hasOrgWideAccess = false;
    return u;
  };

  console.log('✓ Setup complete');

  // Test 1: access control
  console.log('→ Test 1: branch location access…');
  const bmUser = branchManagerUser([storeA.id, warehouseA.id]);
  assertLocationAccess(bmUser, storeA.id);
  assertLocationAccess(bmUser, warehouseA.id);
  assertThrows(() => assertLocationAccess(bmUser, storeB.id), 'outside branch');
  console.log('✓ Test 1 passed');

  // Test 2: add stock + sell
  console.log('→ Test 2: add stock + complete sale…');
  const whInv = await mediator.execute<CreateInventoryCommand, Inventory>(Object.assign(new CreateInventoryCommand(), {
    organizationId: org.id,
    locationId: warehouseA.id,
    productId: product.id,
    reorderLevel: 5,
  }));
  await mediator.execute<AddStockCommand, void>(Object.assign(new AddStockCommand(), {
    organizationId: org.id,
    inventoryId: whInv.id,
    locationId: warehouseA.id,
    productId: product.id,
    quantity: 50,
    performedById: user.id,
  }));

  let storeInv = await mediator.execute<CreateInventoryCommand, Inventory>(Object.assign(new CreateInventoryCommand(), {
    organizationId: org.id,
    locationId: storeA.id,
    productId: product.id,
    reorderLevel: 2,
  }));
  await mediator.execute<AddStockCommand, void>(Object.assign(new AddStockCommand(), {
    organizationId: org.id,
    inventoryId: storeInv.id,
    locationId: storeA.id,
    productId: product.id,
    quantity: 10,
    performedById: user.id,
  }));

  const bill = await mediator.execute<CreateBillCommand, Bill>(Object.assign(new CreateBillCommand(), {
    organizationId: org.id,
    locationId: storeA.id,
    createdById: user.id,
    performedByRoles: [ERole.BranchManager],
    items: [
      Object.assign(new CreateBillItemCommand(), {
        productId: product.id,
        quantity: 3,
        unitPrice: 100,
        taxRate: 0,
        discountAmount: 0,
      }),
    ],
  }));

  const completed = await mediator.execute<TransitionBillStatusCommand, Bill>(Object.assign(new TransitionBillStatusCommand(), {
    id: bill.id,
    status: EBillStatus.Completed,
    paymentMethod: EPaymentMethod.Cash,
    performedById: user.id,
  }));
  assert(completed.status === EBillStatus.Completed, 'bill not completed');

  storeInv = await inventoryRepo.getAsync(storeInv.id);
  assert(Number(storeInv.quantityOnHand) === 7, `store qty expected 7 got ${storeInv.quantityOnHand}`);

  const whAfter = await inventoryRepo.getAsync(whInv.id);
  assert(Number(whAfter.quantityOnHand) === 50, `warehouse qty expected 50 got ${whAfter.quantityOnHand}`);
  console.log('✓ Test 2 passed (store 10→7, warehouse stays 50)');

  // Test 3: DB branch membership
  console.log('→ Test 3: branch ↔ location membership…');
  const locs: { id: string; branch_id: string }[] = await dataSource.query(
    `SELECT id, branch_id FROM core.locations WHERE id = ANY($1)`,
    [[storeA.id, warehouseA.id, storeB.id]],
  );
  const byId = new Map(locs.map((r) => [r.id, r.branch_id]));
  assert(byId.get(storeA.id) === branchA.id, 'store A branch');
  assert(byId.get(warehouseA.id) === branchA.id, 'warehouse A branch');
  assert(byId.get(storeB.id) === branchB.id, 'store B branch');
  console.log('✓ Test 3 passed');

  await moduleRef.close();
  console.log('\n✅ All E2E branch + stock tests passed');
}

main().catch((err) => {
  console.error('\n❌ E2E failed:', err);
  process.exit(1);
});
