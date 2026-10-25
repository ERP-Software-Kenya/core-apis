# Sales Returns and Purchase Returns Design

Date: 2026-09-15

## Goal

Add production-grade returns without disturbing the existing sales, purchase, inventory, credit, and payment flows.

Returns must be modeled as two separate business modules with separate entities:

- `sales-returns`: products returned by customers against completed bills.
- `purchase-returns`: products returned to suppliers against purchase orders.

Existing behavior remains unchanged:

- Bill creation and item editing continue to calculate totals only.
- Bill completion continues to deduct stock.
- Purchase receiving continues to record received quantities only.
- Purchase allocation continues to add stock to inventory.
- New return side effects happen only when a return is finalized.

## Current Context

Sales are represented by `Bill` and `BillItem`. A bill starts as `INITIATED`, can move through `DRAFT`, and only affects inventory when transitioned to `COMPLETED`. Completion deducts official stock for normal and credit sales, deducts unpublished stock for black sales, records credit transactions for credit sales, and records commission for black sales when applicable.

Purchasing is represented by `PurchaseOrder`, `PurchaseItem`, and `PurchaseItemAllocation`. Receiving increases `quantityReceived` but does not add sellable stock. Allocation increases inventory at selected locations and increments `quantityAllocated`.

An existing `item-returns` module exists, but it is not sufficient for this feature. It stores a generic return header by location/order/supplier and total amount, but it does not model sales-return vs purchase-return contracts, source line validation, return line persistence from the API, inventory reversal, customer credit effects, refund tracking, supplier debit behavior, or finalization rules. It should not be extended for this feature.

## Approach

Use separate modules with small shared helpers:

- `sales-returns`
- `purchase-returns`
- shared helpers under `application/shared` for return number generation, decimal/totals utilities, and stock posting primitives

The modules stay separate at the API, entity, repository, CQRS, DTO, and UI level. Shared helpers should be technical utilities only, not a generic return engine.

## Sales Returns

### Data Model

Create `sales_returns`:

- `id`
- `return_number`, unique, generated as `SR-YYYYMMDD-<suffix>`
- `organization_id`
- `location_id`
- `bill_id`
- `customer_id`, nullable
- `sale_type`
- `status`: `draft`, `finalized`, `cancelled`
- `refund_method`, nullable
- `refund_status`: `none`, `pending`, `completed`
- `subtotal`
- `tax_amount`
- `discount_amount`
- `total_amount`
- `reason`, nullable
- `notes`, nullable
- `created_by_id`
- `finalized_by_id`, nullable
- `finalized_at`, nullable
- timestamps

Create `sales_return_items`:

- `id`
- `sales_return_id`
- `bill_item_id`
- `product_id`
- `variant_id`, nullable
- `quantity`
- `unit_price`
- `tax_rate`
- `tax_amount`
- `discount_amount`
- `line_total`
- `condition`: `restock`, `damaged`, `unpublished_restock`
- `reason`, nullable
- timestamps

Line values are snapshots from the original `BillItem` unless explicitly overridden by allowed adjustment fields. Totals use the same calculation style as bill totals.

### Rules

Sales returns are allowed only against completed bills.

The maximum returnable quantity for each bill item is:

`billItem.quantity - sum(finalized sales return item quantities for billItem)`

Draft returns do not count against this total unless the product requirement later chooses reservation-like behavior. Finalized returns are immutable.

Stock behavior on finalization:

- `restock`: add returned quantity back into official inventory at the bill location.
- `damaged`: do not add sellable stock; record a damage/write-off style movement or product activity entry tied to the return.
- `unpublished_restock`: only valid for black sale returns; add returned quantity back into unpublished stock at the bill location.

Money behavior on finalization:

- Normal sale: create a refund/payment transaction record with `referenceType = 'sales_return'` when a refund method is supplied.
- Credit sale: decrease customer credit balance and create a customer credit transaction. Add a new enum value such as `SalesReturn` or `CreditNote` rather than overloading `Adjustment`.
- Black sale: reverse only the returned-line amount in the return record. If commission was previously recorded, create a negative commission payable linked to the sales return.

Existing `Bill.totalAmount` and `Bill.status` should not be mutated by returns. The original bill remains the source document; returns are separate reversal documents.

### API

Add `SalesReturnsController` at `/v1/sales-returns`.

Endpoints:

- `GET /sales-returns`
- `GET /sales-returns/list`
- `GET /sales-returns/:id`
- `POST /sales-returns`
- `PUT /sales-returns/:id`
- `POST /sales-returns/:id/finalize`
- `POST /sales-returns/:id/cancel`

Creation request:

- `billId`
- `reason`
- `notes`
- `refundMethod`
- `items[]` with `billItemId`, `quantity`, `condition`, optional `reason`

The controller must enforce organization and location access using the source bill. Finalize must be idempotent: finalizing an already finalized return returns the current finalized document without posting stock twice.

## Purchase Returns

### Data Model

Create `purchase_returns`:

- `id`
- `return_number`, unique, generated as `PR-YYYYMMDD-<suffix>`
- `organization_id`
- `purchase_order_id`
- `supplier_id`
- `status`: `draft`, `finalized`, `cancelled`
- `dispatch_status`: `pending_dispatch`, `dispatched`, `credited`, default `pending_dispatch`
- `total_amount`
- `reason`, nullable
- `notes`, nullable
- `created_by_id`
- `finalized_by_id`, nullable
- `finalized_at`, nullable
- timestamps

Create `purchase_return_items`:

- `id`
- `purchase_return_id`
- `purchase_item_id`
- `product_id`
- `quantity`
- `unit_cost`
- `line_total`
- `source_type`: `unallocated_received`, `allocated_stock`
- `location_id`, nullable for unallocated received returns and required for allocated stock returns
- `reason`, nullable
- timestamps

### Rules

Purchase returns are allowed against purchase items with received quantity.

The maximum returnable quantity for each purchase item is:

`purchaseItem.quantityReceived - sum(finalized purchase return item quantities for purchaseItem)`

For `unallocated_received` returns:

- Quantity cannot exceed `quantityReceived - quantityAllocated - finalized unallocated returns`.
- Finalization reduces `purchaseItem.quantityReceived`.
- No inventory stock movement is created because stock was never allocated.

For `allocated_stock` returns:

- `locationId` is required.
- Quantity cannot exceed stock available at that inventory location and cannot exceed quantities allocated for that purchase item after prior purchase returns.
- Finalization deducts inventory using stock orchestration, records a `StockOut` movement with `referenceType = 'purchase_return'`, and increments/records returned quantity through the purchase return item.

`PurchaseOrder.totalAmount` should not be mutated by returns. Purchase return documents represent supplier debit/recovery separately from the original PO.

PO status should not be rewound automatically. If a reporting feature needs net purchase state, derive it from PO plus purchase returns.

### API

Add `PurchaseReturnsController` at `/v1/purchase-returns`.

Endpoints:

- `GET /purchase-returns`
- `GET /purchase-returns/list`
- `GET /purchase-returns/:id`
- `POST /purchase-returns`
- `PUT /purchase-returns/:id`
- `POST /purchase-returns/:id/finalize`
- `POST /purchase-returns/:id/cancel`

Creation request:

- `purchaseOrderId`
- `reason`
- `notes`
- `items[]` with `purchaseItemId`, `quantity`, `sourceType`, optional `locationId`, optional `reason`

Controller access should match purchase order rules: Org Admin and Super Admin initially, with organization ownership enforced for every read and mutation.

## Frontend Design

Build production UI in `erp-client` with two separate sections.

### Sales Section

Add a Sales Returns screen near Bills/POS.

Core UX:

- Search/select a completed bill.
- Show bill summary, customer, location, payment/sale type, and return history.
- Show returnable bill lines with already-returned quantities.
- Let the user enter return quantity per line.
- Let the user choose condition per line: restock, damaged, unpublished restock.
- Show live totals and refund/credit impact.
- Validate before submit and clearly show non-returnable lines.
- Create draft, then finalize via an explicit confirmation.

This should feel like an operational ERP screen: dense, scannable, table-first, with clear status badges and minimal decoration.

### Purchase Section

Add a Purchase Returns screen near Purchase Orders.

Core UX:

- Search/select a purchase order.
- Show supplier, PO status, received quantity, allocated quantity, and return history.
- Show purchase items with remaining returnable quantities.
- Let the user choose unallocated received return or allocated stock return.
- Require location for allocated stock returns.
- Show live total value returned to supplier.
- Create draft, then finalize via an explicit confirmation.

Use tables, side panels, filters, status chips, and confirmation modals consistent with the existing client design system.

## Backend Implementation Plan

1. Add enums for sales return status, sales return item condition, purchase return status, purchase return item source type, and customer credit transaction type for sales returns.
2. Add TypeORM entities and migrations for the four new tables.
3. Add domain models, repositories, mapper profiles, DTOs, controllers, commands, and queries for both modules.
4. Add return total helpers and quantity validation helpers.
5. Add sales return finalization service:
   - validate completed source bill
   - validate returnable quantities
   - post inventory/unpublished/damage side effects
   - post refund or credit reversal side effects
   - mark finalized atomically
6. Add purchase return finalization service:
   - validate source PO and purchase items
   - validate unallocated vs allocated quantities
   - reduce received quantity or deduct inventory
   - mark finalized atomically
7. Wire modules into `ApplicationModule` and infrastructure providers.
8. Add focused unit tests for totals, quantity caps, and finalization side effects.
9. Add controller/integration tests for access checks and duplicate finalization prevention.

## Non-Regression Requirements

- Creating a sales return must not mutate bill totals, bill items, or bill status.
- Finalizing a sales return must not deduct stock; it must add stock back or record damage based on condition.
- Creating a purchase return must not mutate PO, purchase items, or inventory.
- Finalizing an unallocated purchase return must reduce received quantity but not touch inventory.
- Finalizing an allocated purchase return must deduct inventory and create stock movement.
- Existing bill completion tests and purchase order receive/allocation tests must continue to pass.
- Every stock movement created by returns must have a return reference ID and explicit reference type.

## Testing Strategy

Backend tests:

- sales return total calculation
- sales return cannot exceed bill item quantity minus prior finalized returns
- sales return restock adds official inventory
- sales return damaged does not add sellable stock
- black sale return uses unpublished stock path
- credit sale return reduces customer balance
- purchase return cannot exceed received quantity
- unallocated purchase return reduces received quantity only
- allocated purchase return deducts inventory from selected location
- finalized returns cannot be edited or posted twice
- org/location access checks for all controllers

Frontend tests:

- Sales Returns screen renders bill search and returnable lines.
- Sales return form blocks over-return.
- Sales return condition controls affect stock-action preview.
- Purchase Returns screen requires location for allocated stock returns.
- Purchase return summary updates totals as quantities change.
- Finalization confirmation calls the correct endpoint and refreshes status.

## Agent Split

Backend agent writes only in `core-apis`:

- new backend modules, entities, migrations, repos, CQRS handlers, tests
- no frontend files

Frontend agent writes only in `erp-client`:

- Sales Returns and Purchase Returns screens
- API client methods, routes/navigation, form state, production UI
- no backend files

The agents should coordinate through this spec. Backend API contracts above are the source of truth unless implementation discovers an existing local convention that requires a small naming adjustment.
