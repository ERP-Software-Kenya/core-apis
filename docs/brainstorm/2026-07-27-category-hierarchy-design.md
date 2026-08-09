# Product Category Hierarchy — Design Spec

**Date:** 2026-07-27
**Approach:** Adjacency list (existing `parentId` column) + PostgreSQL `WITH RECURSIVE` CTE for breadcrumb
**Scope:** Backend (NestJS core-apis) + Frontend API contract

---

## 1. Problem

The `categories` module exists but is skeletal:
- `Category` domain model is missing `parentId`, `description`, `organizationId`, `children`
- `CategoryResponse` returns only `id` and `name`
- `CreateCategoryRequest` accepts only `name`
- `CategoryRepo` has no method to fetch children by `parentId` or ancestors for breadcrumb
- No endpoint for cascading dropdown (children of a specific category)
- Products return `categoryId` only — no breadcrumb, no category name

`CategoryEntity` already has all required columns (`parentId`, `description`, `organizationId`, `isActive`, `parent`, `children` relations). No new migration needed.

---

## 2. Architecture

### 2.1 Data Model (no schema change required)

```
CategoryEntity
  id            uuid PK
  organizationId uuid FK → organizations
  name          varchar(255)
  description   text nullable
  parentId      uuid nullable FK → categories(id)   ← self-reference
  isActive      boolean default true
  createdAt     timestamp
  updatedAt     timestamp
  deletedAt     timestamp (soft delete)
```

Unlimited depth is handled by the self-referencing `parentId`. Root categories have `parentId = null`.

### 2.2 Breadcrumb Strategy

Use a single PostgreSQL `WITH RECURSIVE` CTE to walk from a leaf up to the root in one query:

```sql
WITH RECURSIVE ancestors AS (
  SELECT id, name, parent_id, 0 AS depth
  FROM core.categories WHERE id = $1

  UNION ALL

  SELECT c.id, c.name, c.parent_id, a.depth + 1
  FROM core.categories c
  JOIN ancestors a ON c.id = a.parent_id
)
SELECT name FROM ancestors ORDER BY depth DESC;
```

Result rows ordered root-first are joined with ` > ` to produce `Electronics > Processors > Intel CPUs`.

This runs in one round-trip regardless of depth.

---

## 3. Backend Changes

### 3.1 Domain Model — `Category`

Add missing fields to `src/application/modules/categories/domain/category.model.ts`:

```
+ parentId?      string
+ description?   string
+ organizationId string
+ parent?        Category          (for AutoMapper relation)
+ children?      Category[]
```

### 3.2 Request Models

**`CreateCategoryRequest`** (`models/requests/create-category.request.ts`):
```
+ description?  string   @IsOptional @IsString
+ parentId?     string   @IsOptional @IsUUID
+ isActive?     boolean  @IsOptional @IsBoolean
```
`organizationId` is NOT in the request — it comes from `@CurrentUser()` in the controller.

**`UpdateCategoryRequest`** (`models/requests/update-category.request.ts`):
```
+ description?  string   @IsOptional @IsString
+ parentId?     string   @IsOptional @IsUUID
+ isActive?     boolean  @IsOptional @IsBoolean
```

### 3.3 Response Model

**`CategoryResponse`** (`models/responses/category.response.ts`):
```
existing: id, name
+  parentId?     string
+  description?  string
+  isActive?     boolean
+  breadcrumb?   string    (e.g. "Electronics > Processors > Intel CPUs") — NOT @AutoMap, set post-map
+  createdAt?    Date
```

### 3.4 Commands

**`CreateCategoryCommand`**:
```
+ parentId?      string
+ description?   string
+ isActive?      boolean
+ organizationId string   (injected from controller, not from request)
```

**`CreateCategoryCommandHandler`** — pass all fields to `repo.createAsync(...)`, not just `name`.

**`UpdateCategoryCommand`**:
```
+ description?   string
+ parentId?      string
+ isActive?      boolean
```

**`UpdateCategoryCommandHandler`** — pass all updated fields.

### 3.5 New Query — `GetCategoryChildrenQuery`

**File:** `queries/get-category-children/`

```
GetCategoryChildrenQuery
  parentId?      string | null   (null = fetch root categories)
  organizationId string
```

**Handler:** calls `repo.findChildrenAsync(parentId, organizationId)` → returns `Category[]`.

This is the cascading dropdown endpoint.

### 3.6 Category Repository — New Methods

Add to `ICategoryRepo` and `CategoryRepo`:

```typescript
findChildrenAsync(parentId: string | null, organizationId: string): Promise<Category[]>
findAncestorsAsync(categoryId: string): Promise<Category[]>
```

**`findChildrenAsync`** — TypeORM query:
```typescript
this.internalRepo.find({
  where: {
    organizationId,
    parentId: parentId ?? IsNull(),
    deletedAt: IsNull(),
  },
  order: { name: 'ASC' },
});
```

**`findAncestorsAsync`** — raw `WITH RECURSIVE` CTE (single query, returns rows ordered root → leaf):
```typescript
this.internalRepo.query(`
  WITH RECURSIVE ancestors AS (
    SELECT id, name, parent_id, 0 AS depth
    FROM core.categories WHERE id = $1
    UNION ALL
    SELECT c.id, c.name, c.parent_id, a.depth + 1
    FROM core.categories c JOIN ancestors a ON c.id = a.parent_id
  )
  SELECT id, name FROM ancestors ORDER BY depth DESC
`, [categoryId]);
```

Map raw rows → `Category[]` manually (no AutoMapper needed — only `id` and `name` used for breadcrumb).

### 3.7 Controller Changes

**`GET /categories/children`** — new route (add BEFORE `:id` to avoid route shadowing):
```typescript
@Get('children')
async getChildren(
  @Query('parentId') parentId?: string,
  @CurrentUser() user: AuthenticatedUser,
): Promise<CategoryResponse[]>
```
Dispatches `GetCategoryChildrenQuery` with `parentId` (undefined → null → roots) and `organizationId` from JWT.

**`POST /categories`** — inject `@CurrentUser()` to set `organizationId` on command.

**`PUT /categories/:id`** — pass new fields from `UpdateCategoryRequest`.

### 3.8 AutoMapper Profile Updates

Add to `CategoryProfile`:
```typescript
createMap(mapper, Category, CategoryResponse);  // already exists — new fields auto-map by name
createMap(mapper, CreateCategoryRequest, CreateCategoryCommand);  // existing — new fields auto-map
createMap(mapper, UpdateCategoryRequest, UpdateCategoryCommand);  // existing — new fields auto-map
```

`breadcrumb` on `CategoryResponse` has no `@AutoMap()` — it is set post-map by the controller or query handler after calling `findAncestorsAsync`.

### 3.9 Product Response — Breadcrumb

**`ProductResponse`** — add:
```
+ categoryBreadcrumb?  string   (no @AutoMap — set post-map)
```

**Product query handlers** (`GetProductQueryHandler`, `SearchProductsQueryHandler`, `ListProductsQueryHandler`) — after mapping the product, if `product.categoryId` is set, call `ICategoryRepo.findAncestorsAsync(product.categoryId)` and join names to set `response.categoryBreadcrumb`.

This requires injecting `ICategoryRepo` into the product query handlers. Since `InfrastructureModule` is `global: true`, `CATEGORY_REPO` is already available for injection.

### 3.10 Migration

No new columns required — `CategoryEntity` already has all needed columns. Verify existing migrations cover `parent_id`, `description`, `is_active` on the `categories` table. If a migration gap exists, add one.

---

## 4. Frontend API Contract

This section defines the exact API calls the frontend makes for the cascading dropdown and product form. Actual frontend code lives in a separate repo.

### 4.1 Cascading Dropdown Flow

```
User opens "Add Product" form
  ↓
GET /v1/categories/children            (no parentId → fetch roots)
  → [{ id, name }, { id, name }, ...]
  ↓
User selects "Electronics" (id: abc)
  ↓
GET /v1/categories/children?parentId=abc
  → [{ id, name, ... }, ...]           (Processors, Cables, Storage, ...)
  ↓
User selects "Processors" (id: def)
  ↓
GET /v1/categories/children?parentId=def
  → [{ id, name }, ...]                (Intel, AMD, ...)
  ↓
User selects "Intel" — no more children → leaf selected
  POST /v1/products  { ..., categoryId: "intel-uuid" }
```

### 4.2 Inline Category Creation

When user types a name that doesn't exist in the dropdown:

```
POST /v1/categories
Body: { name: "Intel", parentId: "def", description?: "...", isActive: true }
→ 201 { id, name, parentId, ... }

Frontend adds new category to dropdown and auto-selects it.
```

### 4.3 Product Response with Breadcrumb

```json
GET /v1/products/:id
{
  "id": "prod-uuid",
  "name": "Core i9-13900K",
  "categoryId": "intel-uuid",
  "categoryBreadcrumb": "Electronics > Processors > Intel",
  ...
}
```

Frontend displays `categoryBreadcrumb` in product cards and detail views.

### 4.4 Category List for Management UI

```
GET /v1/categories/children             → root categories
GET /v1/categories/children?parentId=x  → children of x
GET /v1/categories/:id                  → single category detail
PUT /v1/categories/:id                  → rename / toggle isActive / reparent
DELETE /v1/categories/:id               → soft delete
```

---

## 5. File Change Summary

### New files
- `src/application/modules/categories/queries/get-category-children/get-category-children.query.ts`
- `src/application/modules/categories/queries/get-category-children/get-category-children.query-handler.ts`
- `src/application/modules/categories/queries/get-category-children/index.ts`

### Modified files
| File | Change |
|------|--------|
| `categories/domain/category.model.ts` | Add `parentId`, `description`, `organizationId`, `children`, `parent` |
| `categories/models/requests/create-category.request.ts` | Add `description`, `parentId`, `isActive` |
| `categories/models/requests/update-category.request.ts` | Add `description`, `parentId`, `isActive` |
| `categories/models/responses/category.response.ts` | Add `parentId`, `description`, `isActive`, `breadcrumb`, `createdAt` |
| `categories/commands/create-category/create-category.command.ts` | Add `parentId`, `description`, `isActive`, `organizationId` |
| `categories/commands/create-category/create-category.command-handler.ts` | Pass all fields to `createAsync` |
| `categories/commands/update-category/update-category.command.ts` | Add `description`, `parentId`, `isActive` |
| `categories/commands/update-category/update-category.command-handler.ts` | Pass all fields to `updateAsync` |
| `categories/queries/index.ts` | Export `GetCategoryChildrenQuery` + handler |
| `categories/categories.controller.ts` | Add `GET /children`, inject `@CurrentUser()` into create/update |
| `categories/i-category.repo.ts` | Add `findChildrenAsync`, `findAncestorsAsync` to interface |
| `infrastructure/persistence/repositories/category.repo.ts` | Implement both new methods |
| `products/models/responses/product.response.ts` | Add `categoryBreadcrumb?` |
| `products/queries/*/` (get, list, search handlers) | Inject `CATEGORY_REPO`, set `categoryBreadcrumb` post-map |

---

## 6. Error Handling

- `parentId` points to non-existent category → `NotFoundException` in command handler before `createAsync`
- `parentId` circular reference (category set as its own ancestor) → validate in command handler: call `findAncestorsAsync(parentId)` and check none of the returned ids equal the category being updated
- `categoryId` on product points to soft-deleted category → breadcrumb returns empty string, not an error
- `findAncestorsAsync` on a root category (no parent) → returns single-element array → breadcrumb is just the category name

---

## 7. Out of Scope

- Moving a category to a different parent (reparenting) is supported via `PUT /categories/:id` with a new `parentId`, but no cascade-renaming of stored breadcrumbs (breadcrumb is computed on read, not stored)
- Bulk category import
- Category icons or images
- Drag-and-drop tree reordering (frontend concern)
