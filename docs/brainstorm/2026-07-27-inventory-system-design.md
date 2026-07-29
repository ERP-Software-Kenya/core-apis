# Inventory System Design
**Date:** 2026-07-27
**Status:** Approved

---

## 1. Overview

A production-level ERP inventory system built on NestJS + TypeORM + PostgreSQL using CQRS (AutoMapper, nestjs/cqrs). The system manages stock across stores and warehouses (unified as "locations"), enforces a two-tier published/unpublished stock model, provides full ERP stock operations, and maintains a tamper-proof product activity log for every product-touching action.

---

## 2. Architecture Decision

**Approach C — Shared `StockOrchestrationService` + `ProductActivityLogger`**

- `StockOrchestrationService` (shared) wraps every stock operation (qty update + movement record + product log) inside a single `DataSource.transaction()`. Command handlers call one method; atomicity is guaranteed.
- `ProductActivityLogger` (shared) is injected into any command handler that touches a product (create, update, disable, enable). Stock log entries are written automatically by the orchestrator — handlers only call the logger for non-stock product events.
- All routes protected by `JwtAuthGuard` + `RolesGuard`. Destructive operations gated to `ADMIN`; stock management to `ADMIN | MANAGER`; reads open to any authenticated user.

---

## 3. Database Schema

### 3.1 `locations` (new — replaces `stores`)

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `organizationId` | uuid FK | tenant scope |
| `name` | varchar(150) | |
| `type` | enum `STORE \| WAREHOUSE` | |
| `imageKey` | varchar(500) nullable | R2/S3 storage key |
| `address` | varchar(300) nullable | |
| `city` | varchar(100) nullable | |
| `country` | varchar(100) nullable | |
| `phone` | varchar(50) nullable | |
| `isActive` | boolean default true | |
| `createdAt` | timestamp | |
| `updatedAt` | timestamp nullable | |
| `deletedAt` | timestamp nullable | soft delete |

### 3.2 `inventory` (modified)

- `storeId` → `locationId` (FK → locations)
- Add `organizationId` uuid FK
- Add `quantityUnpublished` decimal(18,4) default 0 — quarantine/holding pool
- Add `averageCost` decimal(18,4) nullable — running weighted average unit cost

Unique constraint: `(organizationId, locationId, productId)`

Full columns: `id`, `organizationId`, `locationId`, `productId`, `quantityOnHand`, `quantityUnpublished`, `quantityReserved`, `reorderLevel`, `maxStock`, `averageCost`, `location` (bin label), `createdAt`, `updatedAt`

### 3.3 `stock_movements` (modified)

- `storeId` → `locationId` (FK → locations)
- Add `isUnpublishedEntry` boolean default false — hides movement from published stock history

Updated `EMovementType` enum: `STOCK_IN`, `STOCK_OUT`, `ADJUSTMENT`, `TRANSFER_IN`, `TRANSFER_OUT`, `RETURN`, `DAMAGE`, `WRITE_OFF`, `PUBLISHED`, `RESERVED`, `RESERVATION_RELEASED`

Full columns: `id`, `inventoryId`, `locationId`, `productId`, `performedById`, `referenceId`, `referenceType`, `movementType`, `quantity`, `quantityBefore`, `quantityAfter`, `unitCost`, `isUnpublishedEntry`, `notes`, `createdAt`

### 3.4 `product_logs` (new)

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `organizationId` | uuid FK | |
| `productId` | uuid FK | |
| `inventoryId` | uuid nullable FK | stock-related actions |
| `locationId` | uuid nullable FK | store/warehouse scope |
| `performedById` | uuid nullable FK | |
| `action` | enum `EProductLogAction` | see 3.4.1 |
| `changedFields` | jsonb nullable | `[{field, oldValue, newValue}]` |
| `metadata` | jsonb nullable | quantity, movementType, referenceId, cost, etc. |
| `createdAt` | timestamp | |

**Indexes:** `(productId, createdAt DESC)`, `(organizationId, createdAt DESC)`, `(inventoryId, createdAt DESC)`

#### 3.4.1 `EProductLogAction` enum

`PRODUCT_CREATED`, `PRODUCT_UPDATED`, `PRODUCT_DISABLED`, `PRODUCT_ENABLED`,
`STOCK_ADDED`, `STOCK_REMOVED`, `STOCK_ADJUSTED`, `STOCK_RESERVED`,
`STOCK_RESERVATION_RELEASED`, `STOCK_PUBLISHED`, `STOCK_DAMAGED`,
`STOCK_WRITTEN_OFF`, `STOCK_TRANSFERRED_OUT`, `STOCK_TRANSFERRED_IN`

### 3.5 Migration plan for existing `storeId` references

Entities that reference `storeId` and require migration:
`orders`, `bills`, `item_returns`, `stock_transfers`, `store_members`, `store_product_configs`

Migration steps:
1. Create `locations` table, copy all rows from `stores` with `type = 'STORE'`
2. Rename `store_id` FK columns to `location_id` across affected tables
3. Drop `stores` table

---

## 4. Module Structure

### 4.1 New modules

```
src/application/modules/
  locations/              ← stores + warehouses, image upload
  product-logs/           ← read-only query module for activity log
```

### 4.2 Modified modules

```
src/application/modules/
  inventory/              ← rebuilt domain model, new routes
  stock-movements/        ← rebuilt domain model, orchestrator integration
  stock-transfers/        ← complete/cancel flow, orchestrator integration
```

### 4.3 Shared services

```
src/application/shared/
  enums/
    e-product-log-action.enum.ts
  interfaces/
    i-stock-operation.interface.ts
  services/
    stock-orchestration.service.ts
    product-activity-logger.service.ts
  shared.module.ts                      ← exports both services
```

`SharedModule` is imported by `InventoryModule`, `StockMovementsModule`, `StockTransfersModule`, and any product-touching module.

---

## 5. Two-Tier Stock Model

### Published pool (`quantityOnHand`)
- Visible to all ERP operations: sales, purchases, orders, transfers
- All stock movement routes operate on this pool by default
- History: `stock_movements` where `isUnpublishedEntry = false`

### Unpublished pool (`quantityUnpublished`)
- Invisible to all ERP operations — ghost stock
- Managed via `POST /stock-movements/add-unpublished`
- Movements for this pool have `isUnpublishedEntry = true` and never surface in published history queries
- Product log entries for unpublished additions are written with `metadata.isUnpublished = true`

### Publishing flow
1. User calls `POST /stock-movements/publish` with `{ inventoryId, quantity, performedById }`
2. Orchestrator validates `quantity ≤ quantityUnpublished`
3. In one transaction:
   - `quantityUnpublished -= quantity`
   - `quantityOnHand += quantity`
   - Stock movement created: `movementType = PUBLISHED`, `isUnpublishedEntry = false`
   - Product log written: `action = STOCK_PUBLISHED`, `metadata.quantity`
4. Published stock is now live and participates in all ERP operations

---

## 6. `StockOrchestrationService`

Location: `src/application/shared/services/stock-orchestration.service.ts`

All methods accept a typed `IStockOperation` input and execute inside `DataSource.transaction()`.

| Method | Inventory mutation | Movement type | Log action |
|---|---|---|---|
| `addStock` | `quantityOnHand +=` | `STOCK_IN` | `STOCK_ADDED` |
| `removeStock` | `quantityOnHand -=` | `STOCK_OUT` | `STOCK_REMOVED` |
| `adjustStock` | `quantityOnHand = absolute` | `ADJUSTMENT` | `STOCK_ADJUSTED` |
| `reserveStock` | `quantityReserved +=` | `RESERVED` | `STOCK_RESERVED` |
| `releaseReservation` | `quantityReserved -=` | `RESERVATION_RELEASED` | `STOCK_RESERVATION_RELEASED` |
| `addUnpublishedStock` | `quantityUnpublished +=` | `STOCK_IN` (`isUnpublishedEntry=true`) | logged with `metadata.isUnpublished=true` |
| `publishStock` | `quantityUnpublished -=` `quantityOnHand +=` | `PUBLISHED` | `STOCK_PUBLISHED` |
| `damageStock` | `quantityOnHand -=` | `DAMAGE` | `STOCK_DAMAGED` |
| `writeOffStock` | `quantityOnHand -=` | `WRITE_OFF` | `STOCK_WRITTEN_OFF` |
| `transferOut` | `quantityOnHand -=` on source | `TRANSFER_OUT` | `STOCK_TRANSFERRED_OUT` |
| `transferIn` | `quantityOnHand +=` on dest | `TRANSFER_IN` | `STOCK_TRANSFERRED_IN` |

**Average cost update:** `addStock` and `addUnpublishedStock` recalculate `averageCost`:
```
newAvgCost = ((currentQty * currentAvgCost) + (addedQty * unitCost)) / (currentQty + addedQty)
```

**Validations inside orchestrator:**
- `removeStock`, `damageStock`, `writeOffStock`: `quantity ≤ quantityOnHand`
- `removeStock`: `quantity ≤ (quantityOnHand - quantityReserved)` (cannot remove reserved stock)
- `reserveStock`: `quantity ≤ (quantityOnHand - quantityReserved)`
- `publishStock`: `quantity ≤ quantityUnpublished`
- All: `quantity > 0`

---

## 7. `ProductActivityLogger`

Location: `src/application/shared/services/product-activity-logger.service.ts`

Injectable service. Used directly in command handlers for non-stock product events.
Stock events are written automatically by `StockOrchestrationService` — no manual call needed in stock handlers.

```typescript
interface IProductLogEntry {
  action: EProductLogAction;
  organizationId: string;
  productId: string;
  performedById?: string;
  inventoryId?: string;
  locationId?: string;
  changedFields?: Array<{ field: string; oldValue: unknown; newValue: unknown }>;
  metadata?: Record<string, unknown>;
}

class ProductActivityLogger {
  async log(entry: IProductLogEntry): Promise<void>
  async logBatch(entries: IProductLogEntry[]): Promise<void>  // for bulk ops
}
```

**Usage in product command handlers:**
- `CreateProductCommandHandler` → `log({ action: PRODUCT_CREATED, ... })`
- `UpdateProductCommandHandler` → `log({ action: PRODUCT_UPDATED, changedFields: [...] })`
- `DisableProductCommandHandler` → `log({ action: PRODUCT_DISABLED, ... })`
- `EnableProductCommandHandler` → `log({ action: PRODUCT_ENABLED, ... })`

---

## 8. API Routes

### 8.1 `/v1/locations`

| Method | Route | Description | Roles |
|---|---|---|---|
| `GET` | `/` | Search locations (paginated, filter: type, isActive, organizationId) | Any |
| `GET` | `/list` | List all flat | Any |
| `GET` | `/:id` | Get single | Any |
| `POST` | `/` | Create location | `ADMIN` |
| `PUT` | `/:id` | Update details | `ADMIN` |
| `DELETE` | `/:id` | Soft delete | `ADMIN` |
| `POST` | `/:id/image` | Upload image (multipart/form-data) | `ADMIN` |
| `DELETE` | `/:id/image` | Remove image | `ADMIN` |

### 8.2 `/v1/inventory`

| Method | Route | Description | Roles |
|---|---|---|---|
| `GET` | `/` | Search (filter: locationId, productId, low-stock flag) | Any |
| `GET` | `/list` | List all | Any |
| `GET` | `/low-stock` | Records where `quantityOnHand ≤ reorderLevel` | Any |
| `GET` | `/valuation` | Total stock value per location | `ADMIN`, `MANAGER` |
| `GET` | `/:id` | Get single | Any |
| `GET` | `/:id/summary` | Full summary: onHand, unpublished, reserved, available, avgCost | Any |
| `POST` | `/` | Register product at a location | `ADMIN`, `MANAGER` |
| `PUT` | `/:id` | Update reorderLevel / maxStock / bin label | `ADMIN`, `MANAGER` |
| `DELETE` | `/:id` | Remove inventory slot (must have zero qty) | `ADMIN` |

### 8.3 `/v1/stock-movements`

| Method | Route | Description | Roles |
|---|---|---|---|
| `GET` | `/:id` | Get single | Any |
| `GET` | `/inventory/:inventoryId` | List for inventory record (published only) | Any |
| `POST` | `/add` | Add to published stock (STOCK_IN) | `ADMIN`, `MANAGER` |
| `POST` | `/remove` | Remove from published stock (STOCK_OUT) | `ADMIN`, `MANAGER` |
| `POST` | `/adjust` | Set absolute published qty (ADJUSTMENT) | `ADMIN` |
| `POST` | `/reserve` | Reserve qty for order | `ADMIN`, `MANAGER` |
| `POST` | `/release-reservation` | Release reserved qty | `ADMIN`, `MANAGER` |
| `POST` | `/damage` | Mark qty as damaged | `ADMIN` |
| `POST` | `/write-off` | Write off qty | `ADMIN` |
| `POST` | `/add-unpublished` | Add to unpublished/quarantine pool | `ADMIN`, `MANAGER` |
| `POST` | `/publish` | Publish qty from unpublished → published | `ADMIN`, `MANAGER` |

### 8.4 `/v1/stock-transfers`

| Method | Route | Description | Roles |
|---|---|---|---|
| `GET` | `/` | Search transfers | Any |
| `GET` | `/:id` | Get single | Any |
| `POST` | `/` | Initiate transfer (PENDING) | `ADMIN`, `MANAGER` |
| `PUT` | `/:id/complete` | Complete: deduct source, credit dest, log both | `ADMIN`, `MANAGER` |
| `PUT` | `/:id/cancel` | Cancel pending transfer | `ADMIN` |

### 8.5 `/v1/product-logs`

| Method | Route | Description | Roles |
|---|---|---|---|
| `GET` | `/product/:productId` | All logs for product (paginated, filter: action, date range) | Any |
| `GET` | `/inventory/:inventoryId` | Stock logs for inventory record | Any |
| `GET` | `/location/:locationId` | All logs scoped to a location | Any |
| `GET` | `/:id` | Get single log entry | Any |

---

## 9. RBAC Summary

```
ADMIN   → all routes including destructive ops (delete location, write-off, damage, adjust, cancel transfer)
MANAGER → read all + stock ops (add/remove/reserve/publish/transfer) + create/update inventory slots
STAFF   → any authenticated JWT user with no elevated role; read-only across all modules
```

Guard stack on every controller:
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
```

`@Roles('ADMIN')` or `@Roles('ADMIN', 'MANAGER')` applied at method level where restriction applies. Routes with no `@Roles` decorator are accessible to any authenticated (JWT-valid) user.

`performedById` and `organizationId` extracted from JWT via `@CurrentUser()` decorator and passed into commands — orchestrator and logger receive them from the command object, not from HTTP context.

---

## 10. Hooks for Future Cron / Mail Integration

`StockOrchestrationService.addStock` and `removeStock` will call a `checkReorderLevel` helper after updating quantity. When `quantityOnHand ≤ reorderLevel`, it emits a NestJS application event (`low-stock.triggered`). A future cron/mail listener attaches to this event without modifying the orchestrator.

---

## 11. File Delivery Order (Implementation Sequence)

1. Migration — locations table, inventory/stock_movements column changes, product_logs table
2. Updated entities — LocationEntity, InventoryEntity, StockMovementEntity, ProductLogEntity
3. SharedModule — EProductLogAction enum, IStockOperation interface, ProductActivityLogger, StockOrchestrationService
4. Locations module — full CRUD + image upload (uses existing FileStorageService pattern)
5. Inventory module — rebuilt domain model, requests, responses, command handlers, query handlers
6. Stock-movements module — rebuilt domain model, orchestrator-backed command handlers, list-by-inventory endpoint
7. Stock-transfers module — complete/cancel handlers using orchestrator transferOut + transferIn
8. Product-logs module — entity, repo, query handlers, controller (read-only)
9. Wire ProductActivityLogger into product command handlers (create, update, disable, enable)
10. Update app.module.ts — register all new/modified modules
