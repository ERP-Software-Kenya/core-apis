# Accounts Module — Design Spec

**Date:** 2026-09-15  
**Approach:** A — Extend purchase-orders module  
**Status:** Approved

---

## Overview

Surface per-party financial ledgers for an "Accounts" tab covering two sides:

- **Customers (Debtors)** — already fully implemented. No backend changes required.
- **Suppliers (Purchase Creditors)** — payment tracking is absent. Requires new backend infrastructure.

---

## Customer Side — Already Complete

No backend changes needed. Existing endpoints cover everything:

| Endpoint | Purpose |
|---|---|
| `GET /api/v1/customers/:id` | Live `creditBalance`, `creditLimit` |
| `GET /api/v1/customers/:id/credit-transactions` | Paginated ledger (credit_sale, payment, adjustment, sales_return) |
| `GET /api/v1/customers/:id/bills` | Paginated bill history |
| `GET /api/v1/customers/:id/statement/pdf` | PDF export |
| `POST /api/v1/customers/:id/credit-transactions` | Record payment or adjustment |

Frontend pages `Debtors/` and `Creditors/` already consume these endpoints.

---

## Supplier Side — New Infrastructure

### Data Model

**New entity: `PurchaseOrderPaymentEntity`**  
Table: `core.purchase_order_payments`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `organization_id` | uuid NOT NULL | |
| `purchase_order_id` | uuid NOT NULL FK | → purchase_orders |
| `supplier_id` | uuid NOT NULL FK | Denormalized for supplier-level aggregate queries |
| `amount` | decimal(18,4) NOT NULL | Must be > 0 |
| `payment_method` | varchar(50) NOT NULL | cash, bank_transfer, cheque, etc. |
| `paid_at` | timestamp NOT NULL | Actual payment date, caller-supplied |
| `note` | text nullable | |
| `performed_by_id` | uuid nullable FK | → users |
| `created_at` | timestamp | auto |

**Change to `PurchaseOrderEntity`**

Add one column: `amount_paid decimal(18,4) NOT NULL DEFAULT 0`

- Outstanding per PO = `total_amount - amount_paid`
- `paymentStatus` is computed in the response (not stored):
  - `unpaid` — amountPaid = 0
  - `partial` — 0 < amountPaid < totalAmount
  - `paid` — amountPaid >= totalAmount

---

### New API Endpoints

#### `POST /api/v1/purchase-orders/:id/payments`

Record a partial or full payment against a purchase order.

**Request body:**
```json
{
  "amount": 5000.00,
  "paymentMethod": "bank_transfer",
  "paidAt": "2026-09-15T10:00:00Z",
  "note": "First installment"
}
```

**Validation:**
- `amount > 0`
- `amount <= (totalAmount - amountPaid)` — cannot overpay
- PO status must not be `Draft` or `Cancelled`
- Org ownership asserted on the PO

**Response:** Updated `PurchaseOrderResponse` (gains `amountPaid` and `paymentStatus`)

**Atomicity:** insert payment row + increment `PO.amountPaid` in a single DB transaction.

**Guards:** `ClerkAuthGuard`, `RolesGuard` (OrgAdmin, SuperAdmin)

---

#### `GET /api/v1/purchase-orders/:id/payments`

List all payments recorded for a purchase order.

**Response:** paginated `PurchaseOrderPaymentResponse[]`

---

#### `GET /api/v1/suppliers/:id/account`

Supplier account summary with per-PO breakdown.

**Response:**
```json
{
  "supplierId": "uuid",
  "supplierName": "Acme Ltd",
  "supplierPhone": "...",
  "totalInvoiced": 50000.00,
  "totalPaid": 30000.00,
  "totalOutstanding": 20000.00,
  "purchaseOrders": [
    {
      "id": "uuid",
      "poNumber": "PO-2026-ABC123",
      "status": "received",
      "totalAmount": 15000.00,
      "amountPaid": 10000.00,
      "outstanding": 5000.00,
      "paymentStatus": "partial",
      "createdAt": "2026-09-10T..."
    }
  ]
}
```

---

### Backend Files to Create

**`infrastructure/persistence/entities/`**
- `purchase-order-payment.entity.ts`

**`purchase-orders` module:**
- `domain/purchase-order-payment.model.ts`
- `i-purchase-order-payment.repo.ts`
- `commands/record-purchaseorder-payment/record-purchaseorder-payment.command.ts`
- `commands/record-purchaseorder-payment/record-purchaseorder-payment.command-handler.ts`
- `commands/record-purchaseorder-payment/index.ts`
- `queries/list-purchaseorder-payments/list-purchaseorder-payments.query.ts`
- `queries/list-purchaseorder-payments/list-purchaseorder-payments.query-handler.ts`
- `queries/list-purchaseorder-payments/index.ts`
- `models/requests/record-purchaseorder-payment.request.ts`
- `models/responses/purchase-order-payment.response.ts`

**`suppliers` module:**
- `queries/get-supplier-account/get-supplier-account.query.ts`
- `queries/get-supplier-account/get-supplier-account.query-handler.ts`
- `queries/get-supplier-account/index.ts`
- `models/responses/supplier-account.response.ts`

**`infrastructure/persistence/repositories/`**
- `purchase-order-payment.repo.ts`

### Backend Files to Modify

| File | Change |
|---|---|
| `entities/purchase-order.entity.ts` | Add `amountPaid decimal(18,4) default 0` column |
| `entities/e-core-table-name.ts` | Add `PurchaseOrderPayments` enum value |
| `purchase-orders/models/responses/purchaseorder.response.ts` | Add `amountPaid`, `paymentStatus` fields |
| `purchase-orders/mapper/purchaseorder.profile.ts` | Map new fields + payment model |
| `purchase-orders/commands/index.ts` | Export new command handler |
| `purchase-orders/queries/index.ts` | Export new query handler |
| `purchase-orders/purchase-orders.controller.ts` | Add 2 new endpoints |
| `purchase-orders/purchase-orders.module.ts` | Register new handlers + repo |
| `suppliers/suppliers.controller.ts` | Add `GET /:id/account` endpoint |
| `suppliers/suppliers.module.ts` | Register new query handler |
| `application/constants/index.ts` | Add `PURCHASE_ORDER_PAYMENT_REPO` token |
| `infrastructure/persistence/index.ts` | Register new repo |
| `migrations/index.ts` | Add generated migration |

### RecordPayment Command Logic

```
1. Load PO, assert organizationId matches user.organizationId
2. Reject if PO status is Draft or Cancelled
3. Reject if amount > (totalAmount - amountPaid)
4. BEGIN TRANSACTION
5.   INSERT INTO purchase_order_payments (...) VALUES (...)
6.   UPDATE purchase_orders SET amount_paid = amount_paid + :amount WHERE id = :poId
7. COMMIT
8. Return updated PO
```

### Migration

Run `npm run migration:generate` after entity changes. Never manually write migration files.

Two DDL operations generated:
1. `ALTER TABLE core.purchase_orders ADD COLUMN amount_paid decimal(18,4) NOT NULL DEFAULT 0`
2. `CREATE TABLE core.purchase_order_payments (...)` with FK constraints

---

## Impact on Existing Flows

- No existing endpoints modified — all changes are additive
- `PurchaseOrderResponse` gains two new optional fields — non-breaking for existing consumers
- `amountPaid` defaults to 0 — existing PO rows are unaffected
- The Create → Receive → Allocate lifecycle is completely unchanged

---

## Frontend Changes (ERP-Client)

**Customer side:** No changes. `Debtors/` and `Creditors/` pages are already complete.

**`PurchaseCreditors/` page (supplier list):**
- Add account balance columns per row: `totalOutstanding` via `GET /suppliers/:id/account`
- Row click opens a `SupplierAccountDrawer` showing:
  - Summary cards: total invoiced, total paid, total outstanding
  - Table of POs with `amountPaid`, `outstanding`, `paymentStatus` per row
  - "Record Payment" button per PO row

**`PurchaseOrderDetail/` page:**
- Display `amountPaid` and `paymentStatus` badge
- "Record Payment" button → modal calling `POST /purchase-orders/:id/payments`
- Payment history section → `GET /purchase-orders/:id/payments`
