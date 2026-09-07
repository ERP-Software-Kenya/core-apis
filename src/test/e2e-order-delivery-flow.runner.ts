/**
 * End-to-end sales order → pack → dispatch → delivery runner.
 * Run: npx ts-node -r tsconfig-paths/register src/test/e2e-order-delivery-flow.runner.ts
 */
import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { CqrsMediator } from '../common';
import { BILL_REPO, ORDER_REPO, TRIP_STOP_REPO } from '../application/constants';
import { CreateBranchCommand } from '../application/modules/branches/commands/create-branch/create-branch.command';
import { Branch } from '../application/modules/branches/domain';
import { CreateInventoryCommand } from '../application/modules/inventory/commands/create-inventory/create-inventory.command';
import { Inventory } from '../application/modules/inventory';
import { AddStockCommand } from '../application/modules/stock-movements/commands/add-stock/add-stock.command';
import { CreateLocationCommand } from '../application/modules/locations/commands/create-location/create-location.command';
import { Location } from '../application/modules/locations/domain';
import { CreateProductCommand } from '../application/modules/products/commands/create-product/create-product.command';
import { Product } from '../application/modules/products/domain';
import { CreateCustomerCommand } from '../application/modules/customers/commands/create-customer/create-customer.command';
import { Customer } from '../application/modules/customers/domain';
import { CreateDriverCommand } from '../application/modules/drivers/commands/create-driver/create-driver.command';
import { Driver } from '../application/modules/drivers/domain';
import { CreateVehicleCommand } from '../application/modules/vehicles/commands/create-vehicle/create-vehicle.command';
import { Vehicle } from '../application/modules/vehicles/domain';
import { CreateOrderCommand, CreateOrderItemInput } from '../application/modules/orders/commands/create-order/create-order.command';
import { Order } from '../application/modules/orders/domain';
import { IOrderRepo } from '../application/modules/orders/i-order.repo';
import { FulfillFromStoreCommand } from '../application/modules/order-operations/commands/fulfill-from-store/fulfill-from-store.command';
import { CreateMultiStopTripCommand, TripStopInput } from '../application/modules/trip-operations/commands/create-multi-stop-trip/create-multi-stop-trip.command';
import { Trip } from '../application/modules/trips/domain';
import { InitiateDeliveryOtpCommand } from '../application/modules/trip-operations/commands/initiate-delivery-otp/initiate-delivery-otp.command';
import { ConfirmDeliveryOtpCommand } from '../application/modules/trip-operations/commands/confirm-delivery-otp/confirm-delivery-otp.command';
import { OrderDispatchPaymentService } from '../application/shared/services/order-dispatch-payment.service';
import { IBillRepo } from '../application/modules/bills';
import { ITripStopRepo } from '../application/modules/trip-operations/repositories/i-trip-stop.repo';
import { EOrderStatus } from '../application/shared/enums/e-order-status';
import { EFulfillmentMode } from '../application/shared/enums/e-fulfillment-mode';
import { ETripStatus } from '../application/shared/enums/e-trip-status';
import { ETripStopStatus } from '../application/shared/enums/e-trip-stop-status';
import {
  EBillStatus,
  ELocationType,
  EPaymentTiming,
  ESaleType,
  FuelTypeEntity,
  OrganizationEntity,
  UserEntity,
  VehicleBrandEntity,
  VehicleTypeEntity,
} from '../infrastructure/persistence/entities';

const TEST_OTP = '123456';

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`FAIL: ${msg}`);
}

function step(label: string): void {
  console.log(`→ ${label}`);
}

async function main(): Promise<void> {
  const moduleRef = await NestFactory.createApplicationContext(AppModule.forRoot(), { bufferLogs: true });
  const mediator = moduleRef.get(CqrsMediator);
  const dataSource = moduleRef.get(DataSource);
  const orderRepo = moduleRef.get<IOrderRepo>(ORDER_REPO);
  const billRepo = moduleRef.get<IBillRepo>(BILL_REPO);
  const stopRepo = moduleRef.get<ITripStopRepo>(TRIP_STOP_REPO);
  const dispatchPayment = moduleRef.get(OrderDispatchPaymentService);

  const ts = Date.now();

  step('Ensure fulfillment columns exist (migration 1788400000000)…');
  await dataSource.query(`
    DO $$ BEGIN
      CREATE TYPE "core"."orders_fulfillment_mode_enum" AS ENUM('delivery', 'pickup');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
  await dataSource.query(`
    ALTER TABLE "core"."orders"
      ADD COLUMN IF NOT EXISTS "fulfillment_mode" "core"."orders_fulfillment_mode_enum" NOT NULL DEFAULT 'delivery'
  `);
  await dataSource.query(`
    ALTER TABLE "core"."orders"
      ADD COLUMN IF NOT EXISTS "fulfillment_location_id" uuid
  `);
  await dataSource.query(`
    UPDATE "core"."orders"
    SET "fulfillment_location_id" = "location_id"
    WHERE "fulfillment_location_id" IS NULL
  `);
  await dataSource.query(`
    DO $$ BEGIN
      ALTER TABLE "core"."orders"
        ADD CONSTRAINT "FK__orders__fulfillment_locations"
        FOREIGN KEY ("fulfillment_location_id") REFERENCES "core"."locations"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);

  step('Setup org, store, warehouse, staff user…');
  const org = await dataSource.getRepository(OrganizationEntity).save(
    dataSource.getRepository(OrganizationEntity).create({ name: `E2E Order Org ${ts}`, isActive: true }),
  );

  const staff = await dataSource.getRepository(UserEntity).save(
    dataSource.getRepository(UserEntity).create({
      email: `e2e-order-${ts}@test.local`,
      clerkUserId: `clerk_e2e_order_${ts}`,
      organizationId: org.id,
      firstName: 'E2E',
      lastName: 'Staff',
      isActive: true,
    }),
  );

  const branch = await mediator.execute<CreateBranchCommand, Branch>(
    Object.assign(new CreateBranchCommand(), { organizationId: org.id, name: 'E2E Branch', locationIds: [] }),
  );

  const store = await mediator.execute<CreateLocationCommand, Location>(
    Object.assign(new CreateLocationCommand(), {
      organizationId: org.id,
      branchId: branch.id,
      name: 'E2E Store',
      type: ELocationType.Store,
    }),
  );

  const warehouse = await mediator.execute<CreateLocationCommand, Location>(
    Object.assign(new CreateLocationCommand(), {
      organizationId: org.id,
      branchId: branch.id,
      name: 'E2E Warehouse',
      type: ELocationType.Warehouse,
    }),
  );

  step('Create product + stock at warehouse…');
  const product = await mediator.execute<CreateProductCommand, Product>(
    Object.assign(new CreateProductCommand(), {
      organizationId: org.id,
      name: `E2E Widget ${ts}`,
      sku: `E2E-W-${ts}`,
      retailPrice: 250,
    }),
  );

  const whInv = await mediator.execute<CreateInventoryCommand, Inventory>(
    Object.assign(new CreateInventoryCommand(), {
      organizationId: org.id,
      locationId: warehouse.id,
      productId: product.id,
      reorderLevel: 5,
    }),
  );

  await mediator.execute<AddStockCommand, void>(
    Object.assign(new AddStockCommand(), {
      organizationId: org.id,
      inventoryId: whInv.id,
      locationId: warehouse.id,
      productId: product.id,
      quantity: 100,
      performedById: staff.id,
    }),
  );

  step('Create customer (with email for delivery OTP)…');
  const customer = await mediator.execute<CreateCustomerCommand, Customer>(
    Object.assign(new CreateCustomerCommand(), {
      organizationId: org.id,
      name: 'E2E Delivery Customer',
      email: `e2e-customer-${ts}@test.local`,
      phone: '9999999999',
      address: '12 Test Lane, Nairobi',
    }),
  );

  step('Create driver + vehicle…');
  const driver = await mediator.execute<CreateDriverCommand, Driver>(
    Object.assign(new CreateDriverCommand(), {
      organizationId: org.id,
      firstName: 'E2E',
      lastName: 'Driver',
      phone: '8888888888',
      email: `e2e-driver-${ts}@test.local`,
      licenseNumber: `LIC-${ts}`,
    }),
  );

  const vehicleType =
    (await dataSource.getRepository(VehicleTypeEntity).findOne({ where: {} })) ??
    (await dataSource.getRepository(VehicleTypeEntity).save(
      dataSource.getRepository(VehicleTypeEntity).create({ name: `E2E Van ${ts}`, description: 'E2E' }),
    ));
  const vehicleBrand =
    (await dataSource.getRepository(VehicleBrandEntity).findOne({ where: {} })) ??
    (await dataSource.getRepository(VehicleBrandEntity).save(
      dataSource.getRepository(VehicleBrandEntity).create({ brandName: `E2E Brand ${ts}` }),
    ));
  const fuelType =
    (await dataSource.getRepository(FuelTypeEntity).findOne({ where: {} })) ??
    (await dataSource.getRepository(FuelTypeEntity).save(
      dataSource.getRepository(FuelTypeEntity).create({ name: 'Diesel' }),
    ));
  assert(vehicleType && vehicleBrand && fuelType, 'vehicle type/brand/fuel setup failed');

  const vehicle = await mediator.execute<CreateVehicleCommand, Vehicle>(
    Object.assign(new CreateVehicleCommand(), {
      vehicleNumber: `E2E-${ts}`,
      companyId: org.id,
      vehicleTypeId: vehicleType.id,
      brandId: vehicleBrand.id,
      fuelTypeId: fuelType.id,
    }),
  );

  step('1/7 Create normal COD delivery order with line items…');
  const line1 = Object.assign(new CreateOrderItemInput(), {
    productId: product.id,
    quantity: 2,
    unitPrice: 250,
    taxAmount: 0,
  });
  const line2 = Object.assign(new CreateOrderItemInput(), {
    productId: product.id,
    quantity: 1,
    unitPrice: 250,
    taxAmount: 0,
  });

  const order = await mediator.execute<CreateOrderCommand, Order>(
    Object.assign(new CreateOrderCommand(), {
      locationId: store.id,
      fulfillmentLocationId: warehouse.id,
      fulfillmentMode: EFulfillmentMode.Delivery,
      customerId: customer.id,
      status: EOrderStatus.Confirmed,
      subtotal: 750,
      taxAmount: 0,
      totalAmount: 750,
      paymentStatus: 'UNPAID',
      paymentTiming: EPaymentTiming.Cod,
      saleType: ESaleType.Normal,
      performedById: staff.id,
      items: [line1, line2],
    }),
  );

  assert(order.id, 'order created');
  assert(order.status === EOrderStatus.Confirmed, `expected confirmed got ${order.status}`);
  assert((order.items?.length ?? 0) === 2, `expected 2 line items got ${order.items?.length ?? 0}`);

  const bill = await billRepo.findBySourceOrderIdAsync(order.id);
  assert(bill, 'linked bill should exist');
  assert(bill!.paymentTiming === EPaymentTiming.Cod, 'bill payment timing should be COD');
  console.log(`✓ Order ${order.orderNumber} created (${order.items?.length} items, bill ${bill!.billNumber})`);

  step('2/7 Fulfill from store (mark packed)…');
  const packed = await mediator.execute<FulfillFromStoreCommand, Order>(
    Object.assign(new FulfillFromStoreCommand(), {
      orderId: order.id,
      userId: staff.id,
      organizationId: org.id,
    }),
  );
  assert(packed.status === EOrderStatus.Packed, `expected packed got ${packed.status}`);
  console.log('✓ Order packed');

  step('3/7 Verify payment gate allows dispatch (COD)…');
  const paymentEval = await dispatchPayment.evaluateOrderAsync(order.id);
  assert(paymentEval.canDispatch, `COD should be dispatchable: ${paymentEval.blockReason ?? ''}`);
  assert(paymentEval.canFulfill, 'fulfill should remain allowed');
  console.log(`✓ Payment gate OK (${paymentEval.paymentLabel})`);

  step('4/7 Verify order appears in dispatch queue…');
  const dispatchQueue = await orderRepo.findPackedForDispatchPagedAsync({
    organizationId: org.id,
    $page: 1,
    $perPage: 50,
  });
  assert(
    dispatchQueue.items.some((row) => row.id === order.id),
    'packed order should appear in dispatch list',
  );
  console.log('✓ Order visible in dispatch queue');

  step('5/7 Create delivery trip…');
  const stopInput = Object.assign(new TripStopInput(), { orderId: order.id, sequence: 1 });
  const trip = await mediator.execute<CreateMultiStopTripCommand, Trip>(
    Object.assign(new CreateMultiStopTripCommand(), {
      driverId: driver.id,
      vehicleId: vehicle.id,
      organizationId: org.id,
      stops: [stopInput],
    }),
  );
  assert(trip.id, 'trip created');

  const inTransit = await orderRepo.getAsync(order.id);
  assert(inTransit?.status === EOrderStatus.InTransit, `expected in_transit got ${inTransit?.status}`);
  console.log(`✓ Trip ${trip.tripNumber} created — order in transit`);

  step('6/7 Initiate delivery OTP + confirm delivery…');
  const stops = await stopRepo.findAllByTripAsync(trip.id);
  assert(stops.length === 1, 'expected 1 trip stop');
  const stop = stops[0];

  await mediator.execute(
    Object.assign(new InitiateDeliveryOtpCommand(), {
      tripId: trip.id,
      stopId: stop.id,
      driverUserId: driver.id,
    }),
  );

  // Automated test: seed known OTP (production uses email-only OTP)
  const otpHash = await bcrypt.hash(TEST_OTP, 10);
  await stopRepo.updateOtpAsync(stop.id, otpHash, new Date(Date.now() + 10 * 60 * 1000));

  await mediator.execute<ConfirmDeliveryOtpCommand, boolean>(
    Object.assign(new ConfirmDeliveryOtpCommand(), {
      tripId: trip.id,
      stopId: stop.id,
      otp: TEST_OTP,
      driverUserId: driver.id,
    }),
  );
  console.log('✓ Delivery OTP confirmed');

  step('7/7 Verify order delivered, bill completed, trip completed…');
  const delivered = await orderRepo.getAsync(order.id);
  assert(delivered?.status === EOrderStatus.Delivered, `expected delivered got ${delivered?.status}`);

  const completedBill = await billRepo.findBySourceOrderIdAsync(order.id);
  assert(completedBill?.status === EBillStatus.Completed, `bill should be completed got ${completedBill?.status}`);

  const refreshedStops = await stopRepo.findAllByTripAsync(trip.id);
  assert(refreshedStops[0]?.status === ETripStopStatus.Delivered, 'stop should be delivered');

  const tripRow = await dataSource.query(`SELECT trip_status FROM core.trips WHERE id = $1`, [trip.id]);
  assert(tripRow[0]?.trip_status === ETripStatus.Completed, 'trip should be completed');

  console.log(`✓ Order ${order.orderNumber} DELIVERED — bill ${completedBill!.billNumber} COMPLETED`);

  await moduleRef.close();
  console.log('\n✅ E2E order → pack → dispatch → delivery flow passed');
}

main().catch((err) => {
  console.error('\n❌ E2E order delivery flow failed:', err);
  process.exit(1);
});
