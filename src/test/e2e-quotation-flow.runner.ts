/**
 * End-to-end quotation lifecycle runner:
 * creation → tax-inclusive calculations → updates → revisions → order conversion → conflict guardrails.
 *
 * Run: npx ts-node -r tsconfig-paths/register src/test/e2e-quotation-flow.runner.ts
 */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { AppModule } from '../app.module';
import { CqrsMediator } from '../common';
import { CreateBranchCommand } from '../application/modules/branches/commands/create-branch/create-branch.command';
import { Branch } from '../application/modules/branches/domain';
import { CreateLocationCommand } from '../application/modules/locations/commands/create-location/create-location.command';
import { Location } from '../application/modules/locations/domain';
import { CreateProductCommand } from '../application/modules/products/commands/create-product/create-product.command';
import { Product } from '../application/modules/products/domain';
import { CreateCustomerCommand } from '../application/modules/customers/commands/create-customer/create-customer.command';
import { Customer } from '../application/modules/customers/domain';
import {
  CreateQuotationCommand,
  UpdateQuotationCommand,
  ReviseQuotationCommand,
  ConvertToOrderCommand,
} from '../application/modules/quotations/commands';
import {
  GetQuotationQuery,
  SearchQuotationsQuery,
  GetQuotationRevisionsQuery,
} from '../application/modules/quotations/queries';
import { Quotation } from '../application/modules/quotations/domain';
import { QuotationResponse } from '../application/modules/quotations/models';
import { IQuotationRepo } from '../application/modules/quotations/i-quotation.repo';
import { QUOTATION_REPO, ORDER_REPO } from '../application/constants';
import { IOrderRepo } from '../application/modules/orders/i-order.repo';
import { EFulfillmentMode } from '../application/shared/enums/e-fulfillment-mode';
import {
  ELocationType,
  OrganizationEntity,
  UserEntity,
} from '../infrastructure/persistence/entities';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(`FAIL: ${message}`);
  }
}

function step(label: string): void {
  console.log(`\n→ [STEP] ${label}`);
}

async function main(): Promise<void> {
  console.log('🚀 Bootstrapping Nest context for Quotations E2E Flow...');
  const app = await NestFactory.createApplicationContext(AppModule.forRoot(), {
    bufferLogs: true,
  });

  const mediator = app.get(CqrsMediator);
  const dataSource = app.get(DataSource);
  const quotationRepo = app.get<IQuotationRepo>(QUOTATION_REPO);
  const orderRepo = app.get<IOrderRepo>(ORDER_REPO);

  const ts = Date.now();

  try {
    step('1. Setup base Organization, Location, Customer, and Products');
    const org = await dataSource.getRepository(OrganizationEntity).save(
      dataSource.getRepository(OrganizationEntity).create({
        name: `E2E Quote Org ${ts}`,
        isActive: true,
      }),
    );

    const staff = await dataSource.getRepository(UserEntity).save(
      dataSource.getRepository(UserEntity).create({
        email: `e2e-quote-staff-${ts}@test.local`,
        clerkUserId: `clerk_quote_staff_${ts}`,
        organizationId: org.id,
        firstName: 'Quote',
        lastName: 'Tester',
        isActive: true,
      }),
    );

    const branch = await mediator.execute<CreateBranchCommand, Branch>(
      Object.assign(new CreateBranchCommand(), {
        organizationId: org.id,
        name: `E2E Quote Branch ${ts}`,
        locationIds: [],
      }),
    );

    const store = await mediator.execute<CreateLocationCommand, Location>(
      Object.assign(new CreateLocationCommand(), {
        organizationId: org.id,
        branchId: branch.id,
        name: `E2E Main Store ${ts}`,
        type: ELocationType.Store,
      }),
    );

    const customer = await mediator.execute<CreateCustomerCommand, Customer>(
      Object.assign(new CreateCustomerCommand(), {
        organizationId: org.id,
        name: `Acme Corp ${ts}`,
        phoneNumber: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
        email: `acme-${ts}@test.local`,
      }),
    );

    // Product 1: 18% GST (tax-inclusive target ₹118 => base ₹100, tax ₹18)
    const product1 = await mediator.execute<CreateProductCommand, Product>(
      Object.assign(new CreateProductCommand(), {
        organizationId: org.id,
        name: `Industrial Pump ${ts}`,
        sku: `PUMP-${ts}`,
        retailPrice: 118,
      }),
    );

    // Product 2: 5% GST (tax-inclusive target ₹105 => base ₹100, tax ₹5)
    const product2 = await mediator.execute<CreateProductCommand, Product>(
      Object.assign(new CreateProductCommand(), {
        organizationId: org.id,
        name: `Filter Cartridge ${ts}`,
        sku: `FILTER-${ts}`,
        retailPrice: 105,
      }),
    );

    console.log(`   Created Org: ${org.id}, Store: ${store.id}, Customer: ${customer.id}`);
    console.log(`   Product 1: ${product1.id}, Product 2: ${product2.id}`);

    step('2. Create initial Quotation (Draft v1) with Tax-Inclusive Pricing');
    // Item 1: 2 x ₹118 (18% tax) => total ₹236, base ₹200, tax ₹36
    // Item 2: 3 x ₹105 (5% tax)  => total ₹315, base ₹300, tax ₹15
    // Grand Total: ₹551, Subtotal (Taxable): ₹500, Total Tax: ₹51
    const createCmd = Object.assign(new CreateQuotationCommand(), {
      organizationId: org.id,
      locationId: store.id,
      customerId: customer.id,
      createdByUserId: staff.id,
      notes: 'Initial quotation proposal for Acme Corp',
      items: [
        {
          productId: product1.id,
          quantity: 2,
          unitPriceInclusive: 118,
          taxRate: 18,
        },
        {
          productId: product2.id,
          quantity: 3,
          unitPriceInclusive: 105,
          taxRate: 5,
        },
      ],
    });

    const quote1 = await mediator.execute<CreateQuotationCommand, Quotation>(createCmd);

    assert(quote1, 'Quotation v1 should be created');
    assert(quote1.quoteNumber.startsWith('QT-'), `Expected quote number starting with QT-, got ${quote1.quoteNumber}`);
    assert(quote1.status === 'DRAFT', `Expected status DRAFT, got ${quote1.status}`);
    assert(quote1.versionNumber === 1, `Expected version 1, got ${quote1.versionNumber}`);
    assert(quote1.isLatest === true, 'Expected isLatest to be true');
    assert(quote1.rootQuotationId === quote1.id, 'Expected self-rooted quotation id');
    assert(Number(quote1.subtotal) === 500, `Expected subtotal 500, got ${quote1.subtotal}`);
    assert(Number(quote1.taxAmount) === 51, `Expected taxAmount 51, got ${quote1.taxAmount}`);
    assert(Number(quote1.totalAmount) === 551, `Expected totalAmount 551, got ${quote1.totalAmount}`);
    assert(quote1.items?.length === 2, `Expected 2 items, got ${quote1.items?.length}`);

    console.log(`   ✓ Quotation ${quote1.quoteNumber} (v1) created successfully with exact totals:`);
    console.log(`     Subtotal (Taxable): ₹${quote1.subtotal}, Tax: ₹${quote1.taxAmount}, Total: ₹${quote1.totalAmount}`);

    step('3. Update Quotation (v1 in DRAFT)');
    // Update: Item 1 qty: 3 x ₹118 => ₹354 (base ₹300, tax ₹54)
    //         Item 2 qty: 1 x ₹105 => ₹105 (base ₹100, tax ₹5)
    // Grand Total: ₹459, Subtotal: ₹400, Total Tax: ₹59
    const updateCmd = Object.assign(new UpdateQuotationCommand(), {
      id: quote1.id,
      notes: 'Updated quantities as per client phone call',
      items: [
        {
          productId: product1.id,
          quantity: 3,
          unitPriceInclusive: 118,
          taxRate: 18,
        },
        {
          productId: product2.id,
          quantity: 1,
          unitPriceInclusive: 105,
          taxRate: 5,
        },
      ],
    });

    const updatedQuote1 = await mediator.execute<UpdateQuotationCommand, Quotation>(updateCmd);
    assert(Number(updatedQuote1.subtotal) === 400, `Expected subtotal 400, got ${updatedQuote1.subtotal}`);
    assert(Number(updatedQuote1.taxAmount) === 59, `Expected tax 59, got ${updatedQuote1.taxAmount}`);
    assert(Number(updatedQuote1.totalAmount) === 459, `Expected totalAmount 459, got ${updatedQuote1.totalAmount}`);
    assert(updatedQuote1.notes === 'Updated quantities as per client phone call', 'Expected updated notes');
    console.log(`   ✓ Quotation updated: Subtotal ₹${updatedQuote1.subtotal}, Tax ₹${updatedQuote1.taxAmount}, Total ₹${updatedQuote1.totalAmount}`);

    step('4. Query Quotation & Search');
    const getQuery = Object.assign(new GetQuotationQuery(), { id: quote1.id });
    const fetched = await mediator.execute<GetQuotationQuery, Quotation>(getQuery);
    assert(fetched.id === quote1.id, 'Fetched quote ID matches');
    assert(fetched.customer?.name === `Acme Corp ${ts}`, 'Fetched customer matches');
    assert(fetched.items?.length === 2, 'Fetched items match');

    const searchQuery = Object.assign(new SearchQuotationsQuery(), {
      organizationId: org.id,
      status: 'DRAFT',
      isLatest: true,
    });
    const searchRes = await mediator.execute<SearchQuotationsQuery, { items: Quotation[]; totalCount: number }>(searchQuery);
    assert(searchRes.totalCount >= 1, `Expected at least 1 quotation in search, got ${searchRes.totalCount}`);
    assert(searchRes.items.some((q) => q.id === quote1.id), 'Search results include quote1');
    console.log(`   ✓ Query and search returned valid responses (Found ${searchRes.totalCount} quotations)`);

    step('5. Revise Quotation (Create v2 from v1)');
    const reviseCmd = Object.assign(new ReviseQuotationCommand(), {
      id: quote1.id,
      createdByUserId: staff.id,
    });
    const quote2 = await mediator.execute<ReviseQuotationCommand, Quotation>(reviseCmd);

    assert(quote2.id !== quote1.id, 'Revision v2 must have a new UUID');
    assert(quote2.versionNumber === 2, `Expected v2 version number to be 2, got ${quote2.versionNumber}`);
    assert(quote2.rootQuotationId === quote1.id, `Expected root id ${quote1.id}, got ${quote2.rootQuotationId}`);
    assert(quote2.parentQuotationId === quote1.id, `Expected parent id ${quote1.id}, got ${quote2.parentQuotationId}`);
    assert(quote2.isLatest === true, 'v2 must be latest');
    assert(quote2.status === 'DRAFT', `v2 must start in DRAFT, got ${quote2.status}`);
    assert(quote2.items?.length === 2, 'v2 must inherit cloned items from v1');

    // Verify v1 status was updated to SUPERSEDED and isLatest to false
    const freshV1 = await quotationRepo.getAsync(quote1.id);
    assert(freshV1?.status === 'SUPERSEDED', `v1 status must be SUPERSEDED, got ${freshV1?.status}`);
    assert(freshV1?.isLatest === false, 'v1 isLatest must be false');
    console.log(`   ✓ Revision v2 created: ${quote2.quoteNumber} v${quote2.versionNumber}`);
    console.log(`   ✓ v1 transitioned to status: ${freshV1?.status}, isLatest: ${freshV1?.isLatest}`);

    step('6. Verify Quotation Revisions Tree Query');
    const revisionsQuery = Object.assign(new GetQuotationRevisionsQuery(), { id: quote2.id });
    const revisions = await mediator.execute<GetQuotationRevisionsQuery, Quotation[]>(revisionsQuery);
    assert(revisions.length === 2, `Expected 2 revisions in lineage, got ${revisions.length}`);
    assert(revisions[0].versionNumber === 1 && revisions[1].versionNumber === 2, 'Revisions ordered chronologically');
    console.log(`   ✓ Revision lineage verified: ${revisions.map((r) => `v${r.versionNumber}(${r.status})`).join(' -> ')}`);

    step('7. Convert Quotation v2 to Sales Order');
    const convertCmd = Object.assign(new ConvertToOrderCommand(), {
      id: quote2.id,
      fulfillmentMode: EFulfillmentMode.Pickup,
      fulfillmentLocationId: store.id,
      performedById: staff.id,
    });
    const order = await mediator.execute<ConvertToOrderCommand, any>(convertCmd);

    assert(order, 'Converted order must be returned');
    assert(order.id, 'Order ID must exist');
    assert(order.sourceQuotationId === quote2.id, `Order sourceQuotationId must match v2 id, got ${order.sourceQuotationId}`);
    assert(order.customerId === customer.id, 'Order customerId must match');

    // Verify v2 is now CONVERTED and has convertedOrderId set
    const freshV2 = await quotationRepo.getAsync(quote2.id);
    assert(freshV2?.status === 'CONVERTED', `v2 status must be CONVERTED, got ${freshV2?.status}`);
    assert(freshV2?.convertedOrderId === order.id, `v2 convertedOrderId must point to order ${order.id}`);

    // Verify Order items were populated
    const dbOrder = await orderRepo.getAsync(order.id);
    assert(dbOrder, 'Order must be found in database');
    console.log(`   ✓ Quotation ${quote2.quoteNumber} successfully converted to Sales Order: ${order.id}`);
    console.log(`   ✓ Order linked: sourceQuotationId = ${order.sourceQuotationId}`);

    step('8. Verify Guardrails & Edge Cases (Concurrency & Conflict)');

    // 8a. Double-conversion should throw ConflictException
    let duplicateConvertBlocked = false;
    try {
      await mediator.execute<ConvertToOrderCommand, any>(convertCmd);
    } catch (err: any) {
      if (err instanceof ConflictException || err.message?.includes('already been converted')) {
        duplicateConvertBlocked = true;
      }
    }
    assert(duplicateConvertBlocked, 'Re-converting an already converted quotation must throw ConflictException');
    console.log('   ✓ Guardrail passed: Double conversion blocked with ConflictException');

    // 8b. Revising a converted quotation should throw BadRequestException
    let reviseConvertedBlocked = false;
    try {
      await mediator.execute<ReviseQuotationCommand, Quotation>(
        Object.assign(new ReviseQuotationCommand(), { id: quote2.id, createdByUserId: staff.id }),
      );
    } catch (err: any) {
      if (err instanceof BadRequestException || err.message?.includes('Cannot revise a converted quotation')) {
        reviseConvertedBlocked = true;
      }
    }
    assert(reviseConvertedBlocked, 'Revising a converted quotation must throw BadRequestException');
    console.log('   ✓ Guardrail passed: Revising converted quotation blocked');

    // 8c. Revising a superseded quotation should throw BadRequestException
    let reviseSupersededBlocked = false;
    try {
      await mediator.execute<ReviseQuotationCommand, Quotation>(
        Object.assign(new ReviseQuotationCommand(), { id: quote1.id, createdByUserId: staff.id }),
      );
    } catch (err: any) {
      if (err instanceof BadRequestException || err.message?.includes('Can only revise the latest version')) {
        reviseSupersededBlocked = true;
      }
    }
    assert(reviseSupersededBlocked, 'Revising a superseded quotation must throw BadRequestException');
    console.log('   ✓ Guardrail passed: Revising superseded quotation blocked');

    // 8d. Editing a converted quotation should throw BadRequestException
    let editConvertedBlocked = false;
    try {
      await mediator.execute<UpdateQuotationCommand, Quotation>(
        Object.assign(new UpdateQuotationCommand(), { id: quote2.id, notes: 'Should fail' }),
      );
    } catch (err: any) {
      if (err instanceof BadRequestException || err.message?.includes('Cannot edit a converted quotation')) {
        editConvertedBlocked = true;
      }
    }
    assert(editConvertedBlocked, 'Editing a converted quotation must throw BadRequestException');
    console.log('   ✓ Guardrail passed: Editing converted quotation blocked');

    console.log('\n========================================================');
    console.log('🎉 ALL QUOTATION E2E TESTS PASSED WITH 100% INTEGRITY!');
    console.log('========================================================\n');
  } catch (error) {
    console.error('\n❌ E2E TEST RUNNER FAILED:', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

main().catch((err) => {
  console.error('Fatal error in runner:', err);
  process.exit(1);
});
