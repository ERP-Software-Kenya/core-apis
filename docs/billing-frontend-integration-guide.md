# Billing & Customer Module — Frontend Integration Guide

**Base URL:** `http://localhost:3000/api/v1`  
**Auth:** Pass a Clerk JWT in the `Authorization: Bearer <token>` header on every request (guard is relaxed in dev; required in production).

---

## Overview

| Module   | Endpoints | Description |
|----------|-----------|-------------|
| Customers | 5        | CRUD + paginated search |
| Bills     | 10       | Full lifecycle: draft → complete + item management |

---

## Enums

```ts
enum BillStatus {
  INITIATED  = 'INITIATED',   // just created, items editable
  DRAFT      = 'DRAFT',       // locked for review
  COMPLETED  = 'COMPLETED',   // paid, inventory deducted
  CANCELLED  = 'CANCELLED',
}

enum PaymentMethod {
  CASH        = 'CASH',
  CARD        = 'CARD',
  UPI         = 'UPI',
  NET_BANKING = 'NET_BANKING',
  CHEQUE      = 'CHEQUE',
  CREDIT      = 'CREDIT',
}
```

### Allowed status transitions

```
INITIATED  →  DRAFT | CANCELLED
DRAFT      →  COMPLETED | CANCELLED
COMPLETED  →  (terminal)
CANCELLED  →  (terminal)
```

`paymentMethod` is required when transitioning to `COMPLETED`.

---

## Customer APIs

### 1. Search customers (paginated)

```
GET /v1/customers
```

**Query params**

| Param    | Type   | Description                     |
|----------|--------|---------------------------------|
| name     | string | partial match (case-insensitive) |
| phone    | string | partial match                   |
| $page    | number | default 1                       |
| $perPage | number | default 20                      |

**Example**

```
GET /v1/customers?name=john&$page=1&$perPage=10
```

**Response `200`**

```json
{
  "items": [
    {
      "id": "2c8ce410-ce70-4ccb-9ef3-a7bbcdae73b9",
      "organizationId": "00000000-0000-4000-8000-000000000001",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "gstin": null,
      "createdAt": "2026-07-31T16:10:19.882Z",
      "updatedAt": "2026-07-31T16:10:19.882Z"
    }
  ],
  "page": 1,
  "perPage": 10,
  "totalCount": 1,
  "totalPages": 1
}
```

---

### 2. Get customer by ID

```
GET /v1/customers/:id
```

**Response `200`** — same shape as a single item from the search response above.

**Response `404`** — customer not found.

---

### 3. Create customer

```
POST /v1/customers
Content-Type: application/json
```

**Body**

| Field | Type   | Required | Notes             |
|-------|--------|----------|-------------------|
| name  | string | ✅       |                   |
| email | string |          |                   |
| phone | string |          |                   |
| gstin | string |          | GST identification number |

`organizationId` is injected server-side from the authenticated user's session.

**Example**

```json
{
  "name": "Acme Corp",
  "email": "billing@acme.com",
  "phone": "9876543210",
  "gstin": "29ABCDE1234F1Z5"
}
```

**Response `201`** — full customer object (same as GET by ID).

---

### 4. Update customer

```
PATCH /v1/customers/:id
Content-Type: application/json
```

Partial update — send only fields you want to change.

**Body**

| Field | Type   | Required |
|-------|--------|----------|
| name  | string |          |
| email | string |          |
| phone | string |          |
| gstin | string |          |

**Response `200`** — updated customer object.

**Response `404`** — customer not found.

---

### 5. Delete customer (soft delete)

```
DELETE /v1/customers/:id
```

Soft-deletes the record; it will no longer appear in search results.

**Response `200`** — `true`

**Response `404`** — customer not found.

---

## Bill APIs

### Bill object shape

```json
{
  "id": "c048d610-5a73-46ec-a396-91645c750232",
  "billNumber": "BILL-20260731-0001",
  "organizationId": "00000000-0000-4000-8000-000000000001",
  "locationId": "f4c91324-41b0-477d-a7bc-ba109c1bbd31",
  "customerId": null,
  "createdById": "61e0d78b-2e23-4e9f-9433-2138e9fda878",
  "walkInName": "Walk-In Customer",
  "walkInPhone": null,
  "walkInGstin": null,
  "status": "INITIATED",
  "paymentMethod": null,
  "subtotal": 3000,
  "taxAmount": 540,
  "discountAmount": 0,
  "totalAmount": 3540,
  "notes": null,
  "billedAt": null,
  "createdAt": "2026-07-31T16:04:24.065Z",
  "updatedAt": "2026-07-31T21:34:24.184Z",
  "items": [
    {
      "id": "f567ad26-d957-443e-9bdb-e03b51e5a448",
      "billId": "c048d610-5a73-46ec-a396-91645c750232",
      "productId": "00000000-0000-4000-8000-000000000005",
      "variantId": null,
      "quantity": 2,
      "unitPrice": 1500,
      "taxRate": 18,
      "taxAmount": 540,
      "discountAmount": 0,
      "lineTotal": 3540
    }
  ]
}
```

`items` is present on `POST /bills` (create), `POST /bills/:id/items`, `PUT /bills/:id/items/:itemId`, and `DELETE /bills/:id/items/:itemId` responses. It is **not** included in list/search responses (use `GET /bills/:id` to load items for a specific bill).

**Server-side calculations (do not send these in the body):**
- `taxAmount` per item = `quantity × unitPrice × taxRate / 100`
- `lineTotal` per item = `quantity × unitPrice + taxAmount − discountAmount`
- `subtotal` on bill = sum of `quantity × unitPrice` across all items
- `taxAmount` on bill = sum of item `taxAmount`
- `totalAmount` = `subtotal + taxAmount − discountAmount`

---

### 6. Search bills (paginated)

```
GET /v1/bills
```

**Query params**

| Param        | Type        | Description                        |
|--------------|-------------|------------------------------------|
| organizationId | UUID      | filter by org                      |
| locationId   | UUID        | filter by location                 |
| customerId   | UUID        | filter by linked customer          |
| status       | BillStatus  | filter by status                   |
| $page        | number      | default 1                          |
| $perPage     | number      | default 20                         |

**Example**

```
GET /v1/bills?status=INITIATED&$page=1&$perPage=20
```

**Response `200`**

```json
{
  "items": [ /* Bill objects without items array */ ],
  "page": 1,
  "perPage": 20,
  "totalCount": 5,
  "totalPages": 1
}
```

---

### 7. List bills (flat, no pagination)

```
GET /v1/bills/list
```

**Query params**

| Param        | Type       | Description        |
|--------------|------------|--------------------|
| organizationId | UUID     | filter by org      |
| locationId   | UUID       | filter by location |
| status       | BillStatus | filter by status   |

**Response `200`** — array of bill objects (no `items` array, no pagination wrapper).

---

### 8. Get bill by ID

```
GET /v1/bills/:id
```

Returns the full bill including `items` array.

**Response `200`** — full bill object with `items`.

**Response `404`** — bill not found.

---

### 9. Create bill

```
POST /v1/bills
Content-Type: application/json
```

`organizationId` and `createdById` are injected server-side from the authenticated user's session.

**Body**

| Field       | Type                   | Required | Notes                                          |
|-------------|------------------------|----------|------------------------------------------------|
| locationId  | UUID                   | ✅       |                                                |
| customerId  | UUID                   |          | omit for walk-in; `walkInName` required if so |
| walkInName  | string                 |          | required when `customerId` is absent           |
| walkInPhone | string                 |          |                                                |
| walkInGstin | string                 |          |                                                |
| notes       | string                 |          |                                                |
| items       | CreateBillItemRequest[]| ✅       | can be empty `[]`                              |

**`CreateBillItemRequest`**

| Field          | Type   | Required | Default |
|----------------|--------|----------|---------|
| productId      | UUID   | ✅       |         |
| variantId      | UUID   |          |         |
| quantity       | number | ✅       |         |
| unitPrice      | number | ✅       |         |
| taxRate        | number |          | 0       |
| discountAmount | number |          | 0       |

**Example**

```json
{
  "locationId": "f4c91324-41b0-477d-a7bc-ba109c1bbd31",
  "walkInName": "Ravi Kumar",
  "walkInPhone": "9876543210",
  "items": [
    {
      "productId": "00000000-0000-4000-8000-000000000005",
      "quantity": 2,
      "unitPrice": 1500,
      "taxRate": 18
    }
  ]
}
```

**Response `201`** — full bill object with `items`. Status is always `INITIATED`.

---

### 10. Update bill header

```
PUT /v1/bills/:id
Content-Type: application/json
```

Only works when bill status is `INITIATED`. Partial update — send only changed fields.

**Body**

| Field       | Type | Required |
|-------------|------|----------|
| locationId  | UUID |          |
| customerId  | UUID |          |
| walkInName  | string |        |
| walkInPhone | string |        |
| walkInGstin | string |        |
| notes       | string |        |

**Response `200`** — updated bill object.

**Response `400`** — bill is not in `INITIATED` status.

---

### 11. Delete bill

```
DELETE /v1/bills/:id
```

Soft-deletes. Only allowed for `INITIATED` and `DRAFT` bills.

**Response `200`** — `true`

**Response `400`** — bill is in `COMPLETED` or `CANCELLED` status.

---

### 12. Add item to bill

```
POST /v1/bills/:id/items
Content-Type: application/json
```

Only works when bill status is `INITIATED`. Totals are recalculated automatically.

**Body** — same as `CreateBillItemRequest` (see §9 above).

**Response `201`** — full bill object with updated `items` and totals.

---

### 13. Update bill item

```
PUT /v1/bills/:id/items/:itemId
Content-Type: application/json
```

Only works when bill status is `INITIATED`. Partial update — send only changed fields. Totals recalculated automatically.

**Body**

| Field          | Type   |
|----------------|--------|
| quantity       | number |
| unitPrice      | number |
| taxRate        | number |
| discountAmount | number |

**Response `200`** — full bill object with updated totals.

---

### 14. Remove item from bill

```
DELETE /v1/bills/:id/items/:itemId
```

Only works when bill status is `INITIATED`. Totals recalculated automatically.

**Response `200`** — full bill object with updated totals.

---

### 15. Transition bill status

```
PATCH /v1/bills/:id/status
Content-Type: application/json
```

**Body**

| Field         | Type          | Required | Notes                                      |
|---------------|---------------|----------|--------------------------------------------|
| status        | BillStatus    | ✅       | see allowed transitions above              |
| paymentMethod | PaymentMethod |          | required when `status` is `COMPLETED`      |

**Example — mark as paid**

```json
{
  "status": "COMPLETED",
  "paymentMethod": "CASH"
}
```

**Response `200`** — updated bill. On `COMPLETED`: `billedAt` is set, inventory is deducted.

**Response `400`** — transition not allowed from current status, or no inventory found for a product.

---

## Typical frontend flows

### POS / new sale

```
POST /v1/bills          → create bill (status: INITIATED)
POST /v1/bills/:id/items   → add each product scanned
PUT  /v1/bills/:id/items/:itemId  → adjust qty if needed
PATCH /v1/bills/:id/status  { status: "COMPLETED", paymentMethod: "CASH" }
```

### Quotation / draft

```
POST /v1/bills                         → create (INITIATED)
PATCH /v1/bills/:id/status { status: "DRAFT" }   → lock for review
PATCH /v1/bills/:id/status { status: "COMPLETED", paymentMethod: "UPI" }
```

### Cancel a sale

```
PATCH /v1/bills/:id/status { status: "CANCELLED" }
```

Works from `INITIATED` or `DRAFT` only.

### Customer lookup for a linked bill

```
GET /v1/customers?name=ravi       → search, pick from dropdown
POST /v1/bills { customerId: "<id>", locationId: "..." }
```

---

## Error shape

All error responses follow this structure:

```json
{
  "statusCode": 400,
  "message": "Cannot transition bill from COMPLETED to DRAFT",
  "error": "Bad Request"
}
```

| Status | Meaning                                  |
|--------|------------------------------------------|
| 400    | Validation error or business rule violation |
| 401    | Missing or invalid Clerk token           |
| 404    | Resource not found                       |
| 500    | Unexpected server error (check logs)     |
