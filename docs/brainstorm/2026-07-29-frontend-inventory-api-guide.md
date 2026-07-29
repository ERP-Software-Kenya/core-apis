# Frontend API Integration Guide — Inventory & Stock Management
**Date:** 2026-07-29
**Status:** Reference

---

## Panel Structure

```
ERP Sidebar
├── Inventory                ← published stock (main panel)
│   ├── Stock List
│   ├── Low Stock Alerts
│   ├── Stock Valuation
│   ├── Stock Operations
│   └── Movement History
├── Unpublished Stock        ← ghost/staging pool (separate panel)
│   ├── Staging Pool List
│   ├── Add to Pool
│   ├── Movement History
│   └── Publish to Live
└── Activity Logs            ← read-only audit trail
    ├── By Product
    ├── By Inventory Record
    └── By Location
```

All requests require `Authorization: Bearer <clerk_jwt>` header.
Base URL: `/v1`

---

## 1. Published Inventory Panel

### 1.1 Search / List Inventory

**Endpoint:** `GET /v1/inventory`

**Query params:**

| Param | Type | Description |
|---|---|---|
| `locationId` | uuid | Filter by store or warehouse |
| `productId` | uuid | Filter by product |
| `page` | number | Page number |
| `perPage` | number | Items per page |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "organizationId": "uuid",
      "locationId": "uuid",
      "productId": "uuid",
      "quantityOnHand": 120,
      "quantityReserved": 10,
      "reorderLevel": 20,
      "maxStock": 500,
      "averageCost": 12.50,
      "binLocation": "A-12",
      "createdAt": "2026-07-01T00:00:00Z",
      "updatedAt": "2026-07-29T00:00:00Z"
    }
  ],
  "page": 1,
  "perPage": 20,
  "totalCount": 84,
  "totalPages": 5
}
```

**Computed field for UI:** `available = quantityOnHand - quantityReserved`

**UI:** Table — Product | Location | On Hand | Reserved | Available | Avg Cost | Reorder Level. Filter bar with location and product dropdowns.

---

### 1.2 Get Single Inventory Record

**Endpoint:** `GET /v1/inventory/:id`

Returns same shape as a single item above.

---

### 1.3 List All (no pagination)

**Endpoint:** `GET /v1/inventory/list`

**Query params:** `locationId`, `productId`

Returns flat array. Use for dropdowns.

---

### 1.4 Low Stock Alerts

**Endpoint:** `GET /v1/inventory/low-stock`

Scoped to JWT org automatically. Returns array of records where `quantityOnHand ≤ reorderLevel`.

**UI:** Red badge on sidebar with count. Dedicated alert table highlighting critical products.

---

### 1.5 Stock Valuation

**Endpoint:** `GET /v1/inventory/valuation`

Roles: `ADMIN`, `MANAGER`

Returns all inventory records with `quantityOnHand` and `averageCost`. Compute on frontend:
```
totalValue = sum(quantityOnHand × averageCost)
perLocation = group by locationId, sum within group
```

---

### 1.6 Register Product at a Location

**Endpoint:** `POST /v1/inventory`

Roles: `ADMIN`, `MANAGER`

**Body:**
```json
{
  "locationId": "uuid",
  "productId": "uuid",
  "reorderLevel": 20,
  "maxStock": 500,
  "binLocation": "A-12"
}
```

**UI:** "Add Product to Location" modal on the inventory list page.

> **Note:** This creates the inventory slot with zero quantity. Stock is added separately via stock-movements.

---

### 1.7 Update Inventory Settings

**Endpoint:** `PUT /v1/inventory/:id`

Roles: `ADMIN`, `MANAGER`

**Body:**
```json
{
  "reorderLevel": 30,
  "maxStock": 600,
  "binLocation": "B-05"
}
```

Only updates settings — does not change quantities.

---

### 1.8 Delete Inventory Slot

**Endpoint:** `DELETE /v1/inventory/:id`

Roles: `ADMIN`

Only succeeds when `quantityOnHand = 0`.

---

## 2. Stock Operations

All stock operation endpoints share the base path `POST /v1/stock-movements/{action}`.

Roles: `ADMIN`, `MANAGER` (adjust and write-off are `ADMIN` only — see table).

### Common request body

```json
{
  "inventoryId": "uuid",
  "locationId": "uuid",
  "productId": "uuid",
  "quantity": 50,
  "unitCost": 12.50,
  "referenceId": "uuid",
  "referenceType": "purchase_order",
  "notes": "Received from supplier"
}
```

`unitCost`, `referenceId`, `referenceType`, `notes` are optional on all endpoints.

### Operation reference

| Action | Endpoint | Inventory Effect | Roles |
|---|---|---|---|
| Add stock | `POST /add` | `quantityOnHand +=` | Admin, Manager |
| Remove stock | `POST /remove` | `quantityOnHand -=` | Admin, Manager |
| Set absolute qty | `POST /adjust` | `quantityOnHand = absolute` | Admin only |
| Reserve for order | `POST /reserve` | `quantityReserved +=` | Admin, Manager |
| Release reservation | `POST /release-reservation` | `quantityReserved -=` | Admin, Manager |
| Mark as damaged | `POST /damage` | `quantityOnHand -=` | Admin only |
| Write off | `POST /write-off` | `quantityOnHand -=` | Admin only |

> Adjust uses a different body shape — `absoluteQuantity` instead of `quantity`:
> ```json
> { "inventoryId": "uuid", "locationId": "uuid", "productId": "uuid", "absoluteQuantity": 75 }
> ```

**UI pattern:** Each inventory row has an action dropdown. Selecting any action opens a modal with quantity input + optional notes. Confirm calls the endpoint and refreshes the row.

---

### 2.1 Movement History (Published Stock)

**Endpoint:** `GET /v1/stock-movements/by-inventory/:inventoryId`

**Response:**
```json
[
  {
    "id": "uuid",
    "inventoryId": "uuid",
    "locationId": "uuid",
    "productId": "uuid",
    "movementType": "stock_in",
    "quantity": 50,
    "quantityBefore": 70,
    "quantityAfter": 120,
    "unitCost": 12.50,
    "performedById": "uuid",
    "referenceId": "uuid",
    "referenceType": "purchase_order",
    "notes": "...",
    "createdAt": "2026-07-29T10:00:00Z"
  }
]
```

**`movementType` values and UI badge colours:**

| Value | Meaning | Colour |
|---|---|---|
| `stock_in` | Stock added | Green |
| `stock_out` | Stock removed | Red |
| `adjustment` | Absolute set | Blue |
| `transfer_in` | Received from another location | Teal |
| `transfer_out` | Sent to another location | Orange |
| `damage` | Marked as damaged | Amber |
| `write_off` | Written off | Red |
| `reserved` | Reserved for order | Purple |
| `reservation_released` | Reservation released | Grey |
| `published` | Moved from staging pool | Green |

**UI:** Slide-out drawer or nested table on each inventory row. Timeline ordered by `createdAt DESC`.

---

### 2.2 Get Single Movement

**Endpoint:** `GET /v1/stock-movements/:id`

---

## 3. Stock Transfers (Between Locations)

### 3.1 Create Transfer (PENDING)

**Endpoint:** `POST /v1/stock-transfers`

Roles: `ADMIN`, `MANAGER`

**Body:**
```json
{
  "fromLocationId": "uuid",
  "toLocationId": "uuid",
  "notes": "Weekly replenishment"
}
```

Creates a transfer in `PENDING` state. No inventory moves yet.

---

### 3.2 Complete Transfer

**Endpoint:** `PUT /v1/stock-transfers/:id/complete`

Roles: `ADMIN`, `MANAGER`

**Body:**
```json
{
  "items": [
    {
      "fromInventoryId": "uuid",
      "toInventoryId": "uuid",
      "productId": "uuid",
      "fromLocationId": "uuid",
      "toLocationId": "uuid",
      "quantity": 30
    }
  ]
}
```

Executes `TRANSFER_OUT` on source and `TRANSFER_IN` on destination for each item. Transfer status becomes `COMPLETED`.

---

### 3.3 Cancel Transfer

**Endpoint:** `PUT /v1/stock-transfers/:id/cancel`

Roles: `ADMIN`

Only works on `PENDING` transfers. No inventory effect.

---

### 3.4 Get Transfer

**Endpoint:** `GET /v1/stock-transfers/:id`

---

## 4. Unpublished Stock Panel (Separate Section)

This panel is completely isolated from the main inventory view. Position it as a "Staging Pool" or "Pending Stock" section in the sidebar.

> Stock added here is **invisible** to all ERP operations (orders, transfers, valuation) until explicitly published.

---

### 4.1 Add Stock to Staging Pool

**Endpoint:** `POST /v1/unpublished-stock/add`

Roles: `ADMIN`, `MANAGER`

**Body:**
```json
{
  "locationId": "uuid",
  "productId": "uuid",
  "quantity": 100,
  "unitCost": 10.00,
  "notes": "Awaiting QA clearance"
}
```

**Key difference from published add:** No `inventoryId` needed. The system automatically finds or creates the ghost record by `locationId + productId`. Returns `201` with no body.

**UI flow:**
```
Staging Pool page → "Stage New Stock" button
  → Form: Location picker | Product picker | Quantity | Unit Cost | Notes
  → Submit
  → Toast: "100 units staged for [Product] at [Location] — not visible to system yet"
```

---

### 4.2 Get Unpublished Stock Record

**Endpoint:** `GET /v1/unpublished-stock/:id`

**Response:**
```json
{
  "id": "uuid",
  "organizationId": "uuid",
  "locationId": "uuid",
  "productId": "uuid",
  "quantityOnHand": 100,
  "averageCost": 10.00,
  "binLocation": null,
  "createdAt": "2026-07-29T08:00:00Z",
  "updatedAt": "2026-07-29T08:00:00Z"
}
```

> **Current gap:** No list/search endpoint exists yet for unpublished stock. You need to store the `id` from a previous response or fetch by product+location. A `GET /v1/unpublished-stock` list endpoint needs to be built — see Section 6.

---

### 4.3 Unpublished Movement History

**Endpoint:** `GET /v1/unpublished-stock/by-record/:unpublishedStockId`

**Response:**
```json
[
  {
    "id": "uuid",
    "unpublishedStockId": "uuid",
    "movementType": "stock_in",
    "quantity": 100,
    "quantityBefore": 0,
    "quantityAfter": 100,
    "unitCost": 10.00,
    "performedById": "uuid",
    "notes": "Awaiting QA",
    "createdAt": "2026-07-29T08:00:00Z"
  }
]
```

**`movementType` values:**

| Value | Meaning |
|---|---|
| `stock_in` | Stock staged into pool |
| `transfer_out` | Stock published to live inventory |

**UI:** History tab within the staging pool record — timeline of when stock was added and when portions were published.

---

### 4.4 Publish Stock (Staging → Live)

**Endpoint:** `POST /v1/unpublished-stock/publish`

Roles: `ADMIN`, `MANAGER`

**Body:**
```json
{
  "unpublishedStockId": "uuid",
  "quantity": 50,
  "notes": "QA approved batch A"
}
```

**What happens in one atomic transaction:**
1. Deducts `quantity` from `unpublished_stock.quantityOnHand`
2. Adds `quantity` to `inventory.quantityOnHand` (published record for same location/product)
3. Writes `transfer_out` to `unpublished_stock_movements`
4. Writes `stock_in` to `stock_movements` (published ledger)
5. Logs `STOCK_PUBLISHED` to `product_logs`

**Prerequisite:** A published `inventory` record must already exist for the same `locationId + productId`. Create one via `POST /v1/inventory` first if it does not exist. If missing, the endpoint returns `400`.

**UI flow:**
```
Staging Pool row → "Publish" button
  → Modal: "Publish to live inventory"
             Available in staging: 100 units
             Quantity to publish: [___]
             Notes: [___]
  → Confirm
  → Toast: "50 units are now live in inventory"
  → Both panels refresh
```

---

## 5. Activity Logs Panel

All log endpoints are read-only. Any authenticated user can access them.

### 5.1 Logs by Product

**Endpoint:** `GET /v1/product-logs/product/:productId`

**Query params:**

| Param | Type | Description |
|---|---|---|
| `action` | enum | Filter by action type |
| `dateFrom` | ISO date | Start of date range |
| `dateTo` | ISO date | End of date range |
| `page` | number | |
| `perPage` | number | |

**Response item:**
```json
{
  "id": "uuid",
  "action": "STOCK_ADDED",
  "organizationId": "uuid",
  "productId": "uuid",
  "inventoryId": "uuid",
  "locationId": "uuid",
  "performedById": "uuid",
  "changedFields": null,
  "metadata": {
    "quantity": 50,
    "referenceId": "uuid",
    "unitCost": 12.50
  },
  "createdAt": "2026-07-29T10:00:00Z"
}
```

**All `action` values:**

| Action | When written |
|---|---|
| `PRODUCT_CREATED` | New product created |
| `PRODUCT_UPDATED` | Product fields changed — `changedFields` has old/new values |
| `PRODUCT_DISABLED` | Product disabled |
| `PRODUCT_ENABLED` | Product re-enabled |
| `STOCK_ADDED` | Stock added to published pool |
| `STOCK_REMOVED` | Stock removed from published pool |
| `STOCK_ADJUSTED` | Absolute quantity set |
| `STOCK_RESERVED` | Qty reserved for order |
| `STOCK_RESERVATION_RELEASED` | Reservation released |
| `STOCK_PUBLISHED` | Staging pool → live (metadata has `quantity`) |
| `STOCK_DAMAGED` | Qty marked as damaged |
| `STOCK_WRITTEN_OFF` | Qty written off |
| `STOCK_TRANSFERRED_OUT` | Sent to another location |
| `STOCK_TRANSFERRED_IN` | Received from another location |

**UI:** Timeline on product detail page. Filter by action and date. For `PRODUCT_UPDATED` entries render `changedFields` as a before/after diff.

---

### 5.2 Logs by Inventory Record

**Endpoint:** `GET /v1/product-logs/inventory/:inventoryId`

All stock events for a specific product at a specific location. Use on the inventory detail drawer — "Full History" tab.

---

### 5.3 Logs by Location

**Endpoint:** `GET /v1/product-logs/location/:locationId`

All activity across every product at that location. Use on the store/warehouse detail page with date filter.

---

### 5.4 Get Single Log

**Endpoint:** `GET /v1/product-logs/:id`

---

## 6. API Call Sequences for Common UI Flows

### Add published stock to a product

```
1. GET /v1/inventory?locationId=X&productId=Y
   → get the inventoryId for this product/location

2. POST /v1/stock-movements/add
   Body: { inventoryId, locationId, productId, quantity, unitCost }

3. GET /v1/stock-movements/by-inventory/{inventoryId}
   → refresh movement history in the UI
```

---

### Stage ghost stock then publish it

```
1. POST /v1/unpublished-stock/add
   Body: { locationId, productId, quantity, unitCost, notes }
   → save returned unpublishedStockId

2. [later — after QA or approval]
   POST /v1/unpublished-stock/publish
   Body: { unpublishedStockId, quantity, notes }
   → inventory.quantityOnHand increases
   → unpublished_stock.quantityOnHand decreases

3. GET /v1/inventory?locationId=X&productId=Y
   → confirm published qty increased
```

---

### Transfer stock between locations

```
1. POST /v1/stock-transfers
   Body: { fromLocationId, toLocationId, notes }
   → transferId

2. PUT /v1/stock-transfers/{transferId}/complete
   Body: { items: [{ fromInventoryId, toInventoryId, productId,
                     fromLocationId, toLocationId, quantity }] }
   → source inventory decreases, destination increases
```

---

### View full audit trail for a product

```
GET /v1/product-logs/product/{productId}?page=1&perPage=50
→ timeline of every action ever taken on this product
```

---

## 7. Gaps to Build Before Full Frontend Integration

These backend endpoints are missing and needed before the corresponding UI panels can work:

| Missing Endpoint | Panel Blocked | Priority |
|---|---|---|
| `GET /v1/unpublished-stock` (list/search) | Staging Pool list view | High |
| `GET /v1/inventory/:id/summary` | Inventory detail summary card | Medium |
| `GET /v1/stock-transfers` (list/search) | Transfer history browse | Medium |

The unpublished stock list endpoint is the most urgent — without it the staging panel has no way to display existing ghost records, only individual lookups by ID.
