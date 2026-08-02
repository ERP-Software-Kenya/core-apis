# Supplier API — Frontend Integration Guide

**Base URL:** `/v1/suppliers`
**Auth:** Bearer token (Clerk JWT) required on all endpoints.
**Roles required:** `OrgAdmin` or `SuperAdmin`

---

## Endpoints

### `GET /v1/suppliers`

Paginated search with optional filters.

**Query params:**

| Param | Type | Description |
|---|---|---|
| `name` | `string` | Filter by supplier name |
| `isActive` | `boolean` | Filter by active status |
| `$ids` | `string[]` | Filter by specific UUIDs |
| `$orderBy` | `string` | Field to sort by |
| `$order` | `ASC` \| `DESC` | Sort direction |
| `$page` | `number` | Page number |
| `$perPage` | `number` | Items per page |

**Response:**

```json
{
  "items": [SupplierResponse],
  "page": 1,
  "perPage": 20,
  "totalCount": 100,
  "totalPages": 5
}
```

---

### `GET /v1/suppliers/list`

Non-paginated list. Same query params as search minus pagination.

**Response:** `SupplierResponse[]`

---

### `GET /v1/suppliers/:id`

Get a single supplier by UUID.

**Response:** `SupplierResponse`

---

### `POST /v1/suppliers`

Create a new supplier. `organizationId` is stamped server-side from the JWT — do not send it in the body.

**Request body:**

```json
{
  "name": "Acme Ltd",
  "contactPerson": "Jane Doe",
  "email": "jane@acme.com",
  "phone": "+254700000000",
  "address": "Nairobi, Kenya",
  "taxId": "A123456789"
}
```

| Field | Required | Validation |
|---|---|---|
| `name` | Yes | Non-empty string |
| `contactPerson` | No | string |
| `email` | No | Valid email format |
| `phone` | No | string |
| `address` | No | string |
| `taxId` | No | string |

**Response:** `SupplierResponse` — HTTP 201

---

### `PUT /v1/suppliers/:id`

Partial update — only fields included in the body are applied. Omitted fields are left unchanged.

**Request body:**

```json
{
  "name": "Updated Name",
  "contactPerson": "John Smith",
  "email": "john@acme.com",
  "phone": "+254711111111",
  "address": "Mombasa, Kenya",
  "taxId": "B987654321",
  "isActive": false
}
```

All fields optional. `isActive: false` deactivates the supplier.

**Response:** `SupplierResponse`

---

### `DELETE /v1/suppliers/:id`

Soft delete — sets `deletedAt` internally; record is excluded from all queries going forward.

**Response:** `true` (boolean)

---

## SupplierResponse

```ts
{
  id: string;             // UUID
  organizationId?: string;
  name?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  isActive?: boolean;     // defaults true on create
  createdAt?: Date;
  updatedAt?: Date;
}
```

---

## Product–Supplier Linking

Suppliers attach to products via a junction table. These endpoints live under the products resource:

### `GET /v1/products/:id/suppliers`

List all suppliers linked to a product.

**Response:** `ProductSupplierResponse[]`

---

### `POST /v1/products/:id/suppliers`

Link a supplier to a product.

**Request body:**

```json
{
  "supplierId": "uuid",
  "isDefault": true,
  "unitCost": 150.00,
  "leadTimeDays": 7,
  "minOrderQty": 10
}
```

| Field | Required | Description |
|---|---|---|
| `supplierId` | Yes | UUID of the supplier to link |
| `isDefault` | No | Mark as the default supplier for this product |
| `unitCost` | No | Cost per unit from this supplier |
| `leadTimeDays` | No | Days from order to delivery |
| `minOrderQty` | No | Minimum order quantity |

> Setting `isDefault: true` automatically clears `isDefault` on all other linked suppliers for the same product.

**Response:** `ProductSupplierResponse` — HTTP 201

---

### `PUT /v1/products/:id/suppliers/:supplierId`

Update the link's business data. All fields optional.

**Request body:**

```json
{
  "isDefault": true,
  "unitCost": 140.00,
  "leadTimeDays": 5,
  "minOrderQty": 20
}
```

**Response:** `ProductSupplierResponse`

---

### `DELETE /v1/products/:id/suppliers/:supplierId`

Unlink a supplier from a product (hard delete on the junction record).

**Response:** `true` (boolean)

---

## ProductSupplierResponse

```ts
{
  id: string;           // junction record UUID
  productId: string;
  supplierId: string;
  isDefault?: boolean;
  unitCost?: number;
  leadTimeDays?: number;
  minOrderQty?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
```

---

## Notes

- `organizationId` is never accepted from the client — always derived from the Clerk JWT on create.
- `isActive` defaults to `true` on create; use `PUT` with `isActive: false` to deactivate without deleting.
- Deleted suppliers (`DELETE /v1/suppliers/:id`) are soft-deleted and automatically excluded from all list/search queries.
- Only one supplier per product can have `isDefault: true` at a time — enforced server-side.
