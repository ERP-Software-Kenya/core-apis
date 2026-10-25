# Tax Module Design

Date: 2026-09-22

## Goal

Add a named, org-scoped tax definition system so every product can carry an authoritative tax rate. When a product is added to a bill the backend auto-populates `bill_item.tax_rate` from that definition. Historical bills are unaffected — the rate is snapshotted at billing time. The frontend displays the tax on the product form and on every bill view.

## Constraints confirmed

- Flat rate only (single percentage, no CGST/SGST components).
- Exclusive tax — tax is added on top of unit price. `bill-totals.ts` computation is unchanged.
- Product-level assignment only — no category inheritance.
- Backend auto-populates `taxRate` on bill items; frontend displays what the API returns.
- Default seed: one "Standard Tax (16%)" per org, assigned to all existing products.

---

## Data Model

### New table: `core.taxes`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `organization_id` | `uuid` FK → `organizations` | org-scoped |
| `name` | `varchar(100)` | e.g. `"GST 16%"`, `"Standard Tax"` |
| `rate` | `decimal(10,4)` | percentage value, e.g. `16.0000` |
| `description` | `text` nullable | optional UI label |
| `is_active` | `boolean` default `true` | soft-disable without deleting |
| `created_at` | `timestamp` | |
| `updated_at` | `timestamp` nullable | |
| `deleted_at` | `timestamp` nullable | soft-delete |

FK constraint name: `FK__taxes__organizations`
PK constraint name: `PK_taxes`

### Change to `core.products`

Add one nullable column:

| Column | Type | Notes |
|---|---|---|
| `tax_id` | `uuid` nullable FK → `taxes` | null = 0% (no tax applied) |

FK constraint name: `FK__products__taxes`

### `core.bill_items` — no change

`tax_rate` and `tax_amount` columns already exist. The rate is **snapshotted** from `product.tax.rate` at billing time. Future changes to the tax definition do not retroactively alter any bill.

---

## ECoreTableName addition

Add to `e-core-table-name.ts`:

```
Taxes = 'taxes',
```

---

## New module: `application/modules/taxes`

### File layout

```
application/modules/taxes/
  commands/
    create-tax/
      create-tax.command.ts
      create-tax.command-handler.ts
      index.ts
    update-tax/
      update-tax.command.ts
      update-tax.command-handler.ts
      index.ts
    delete-tax/
      delete-tax.command.ts
      delete-tax.command-handler.ts
      index.ts
    index.ts
  queries/
    get-tax/
      get-tax.query.ts
      get-tax.query-handler.ts
      index.ts
    list-taxes/
      list-taxes.query.ts
      list-taxes.query-handler.ts
      index.ts
    search-taxes/
      search-taxes.query.ts
      search-taxes.query-handler.ts
      index.ts
    index.ts
  domain/
    tax.model.ts
    tax.filter.ts
    index.ts
  models/
    requests/
      create-tax.request.ts
      update-tax.request.ts
      search-taxes.request.ts
      list-taxes.request.ts
      index.ts
    responses/
      tax.response.ts
      taxes-paged.response.ts
      index.ts
    index.ts
  helpers/
    tax-filter.normalizer.ts
    index.ts
  mapper/
    tax.profile.ts
    index.ts
  i-tax.repo.ts
  taxes.controller.ts
  taxes.module.ts
  index.ts
```

### Infrastructure files

```
infrastructure/persistence/entities/tax.entity.ts
infrastructure/persistence/repositories/tax.repo.ts
```

Migration is generated via `npm run migration:generate` after both entity changes (new `tax.entity.ts` and `tax_id` column on `product.entity.ts`) are in place.

---

## Domain model: `Tax`

```ts
// domain/tax.model.ts
export class Tax {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public rate: number;
  @AutoMap() public description?: string;
  @AutoMap() public isActive: boolean;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
```

---

## API — `TaxesController` at `/v1/taxes`

All endpoints: `ClerkAuthGuard`, `RolesGuard`. Every query/command is scoped to `user.organizationId`.

| Method | Path | Description |
|---|---|---|
| `GET` | `/taxes` | Search taxes (paginated) |
| `GET` | `/taxes/list` | Flat list of active taxes |
| `GET` | `/taxes/:id` | Get single tax by ID |
| `POST` | `/taxes` | Create a tax |
| `PUT` | `/taxes/:id` | Update a tax |
| `DELETE` | `/taxes/:id` | Soft-delete a tax |

### `CreateTaxRequest`

```ts
name: string          // @IsString(), @MaxLength(100)
rate: number          // @IsNumber(), @Min(0), @Max(100)
description?: string  // @IsOptional()
```

### `UpdateTaxRequest`

```ts
name?: string
rate?: number         // @Min(0), @Max(100)
description?: string
isActive?: boolean    // toggle without deleting
```

### `TaxResponse`

```ts
id: string
organizationId: string
name: string
rate: number
description?: string
isActive: boolean
createdAt: Date
updatedAt?: Date
```

### `TaxesPagedResponse`

```ts
items: TaxResponse[]
page: number
perPage: number
totalCount: number
totalPages: number
```

---

## Repository interface: `ITaxRepo`

Add `TAX_REPO = 'TAX_REPO'` to `application/constants.ts` alongside the other repo tokens.

```ts
// i-tax.repo.ts
export interface ITaxRepo extends IBaseRepo<Tax, string> {
  getAsync(id: string): Promise<Tax | null>;
  findByOrgAsync(organizationId: string, filter: TaxFilter): Promise<Tax[]>;
  searchAsync(filter: TaxFilter): Promise<IPageable<Tax>>;
  createAsync(entity: Tax): Promise<Tax>;
  updateAsync(entity: Tax): Promise<Tax>;
  softDeleteAsync(id: string): Promise<boolean>;
}
```

---

## Product module changes

### `ProductEntity`

Add column and relation:

```ts
@AutoMap()
@Column({ name: 'tax_id', type: 'uuid', nullable: true })
public taxId?: string;

@AutoMap(() => TaxEntity)
@ManyToOne(() => TaxEntity, { nullable: true, eager: false })
@JoinColumn({
  name: 'tax_id',
  referencedColumnName: 'id',
  foreignKeyConstraintName: `FK__${ECoreTableName.Products}__${ECoreTableName.Taxes}`,
})
public tax?: TaxEntity;
```

### `Product` domain model

```ts
@AutoMap() public taxId?: string;
```

### `CreateProductRequest` / `UpdateProductRequest`

```ts
@ApiPropertyOptional()
@IsOptional()
@IsUUID()
@AutoMap()
public taxId?: string;
```

### `CreateProductCommand` / `UpdateProductCommand`

```ts
@AutoMap() public taxId?: string;
```

### `ProductResponse`

```ts
@ApiPropertyOptional()
@AutoMap()
public taxId?: string;

@ApiPropertyOptional({ type: () => TaxResponse })
@AutoMap(() => TaxResponse)
public tax?: TaxResponse;
```

### `ProductProfile` mapper

Add mapping entries:

```ts
createMap(mapper, TaxEntity, TaxResponse);   // reuse TaxResponse from taxes module
```

AutoMapper propagates `taxId` automatically via `@AutoMap()` on both sides. The nested `tax?: TaxResponse` mapping requires an explicit `forMember` only if the nested type name differs — if `TaxResponse` is imported from the taxes module barrel and registered, it resolves automatically.

### `GetProductQueryHandler` / repo

The product repository's `getAsync` must join the `tax` relation:

```ts
// In TypeORM repo findOne options:
relations: ['tax']
```

This is the only place the join is needed — listing/searching products does not need to eager-load the tax object (the `taxId` scalar is sufficient for list views).

---

## Bill integration — auto-populate `taxRate`

### Injection change

Both `AddBillItemCommandHandler` and `CreateBillCommandHandler` already inject `PRODUCT_REPO`. No new dependency is needed.

### `AddBillItemCommandHandler.execute`

After building `item`, resolve taxRate before calling `computeBillItemTotals`:

```ts
if (command.taxRate != null) {
  item.taxRate = command.taxRate;            // explicit override from caller
} else {
  const product = await this.productRepo.getAsync(command.productId);
  item.taxRate  = product?.tax?.rate ?? 0;  // auto-populate; 0 if product has no tax
}
```

`productRepo.getAsync` must join the `tax` relation (same change as above — consistent single source).

### `CreateBillCommandHandler.execute`

For basket-create flow, after mapping items apply the same resolution per item. Since `applyBillTotals` is called after all items are built, resolve all taxRates before that call:

```ts
for (const item of bill.items ?? []) {
  if (item.taxRate == null) {
    const product = await this.productRepo.getAsync(item.productId);
    item.taxRate  = product?.tax?.rate ?? 0;
  }
}
applyBillTotals(bill);
```

### `UpdateBillItemCommandHandler` — no change

`taxRate` remains in `ITEM_FIELDS`. If the caller sends an explicit `taxRate` it is applied; if `undefined`, the existing value is preserved. No auto-re-resolve on update — the cashier's explicit edit is intentional.

---

## Seeding strategy

Migrations are DDL-only per project rules. The default 16% seed goes into a dedicated seeder:

**`infrastructure/seeders/tax-default.seeder.ts`**

Logic:
1. For each row in `organizations`, insert one tax record: `name = 'Standard Tax'`, `rate = 16`, `is_active = true`, if that org does not already have any tax record.
2. UPDATE all `products` rows in that org where `tax_id IS NULL` to point to the newly inserted tax id.

The seeder is registered in the seeder configuration alongside existing seeders and run once after migrations on initial setup. It is idempotent — the existence check in step 1 prevents duplicates on re-run.

---

## Frontend design

The `erp-client` source is external to this repo. The backend API contracts above are the source of truth.

### Tax management

**Route**: `/settings/taxes` (or wherever the org settings pages live)

**Tax list page**:
- Table columns: Name, Rate (%), Status (Active/Inactive), Actions (Edit, Delete)
- "New Tax" button opens a create modal
- Soft-deleted taxes are hidden by default

**Create / Edit Tax modal**:
- Fields: Name (text), Rate (number, 0–100, show "%" suffix), Description (optional textarea), Active toggle (edit only)
- Save calls `POST /v1/taxes` or `PUT /v1/taxes/:id`

**Delete Tax**:
- Confirmation dialog warning that products assigned to this tax will fall back to 0% on the next billing session
- Calls `DELETE /v1/taxes/:id` (soft-delete)

### Product form changes

Add a **Tax** select field to the Create/Edit Product form:

- Options fetched from `GET /v1/taxes/list` (flat list of active taxes)
- Display: `"Standard Tax (16%)"` format
- Include a "No Tax (0%)" option representing `taxId = null`
- Pre-selects the product's current `taxId` on edit
- On save, sends `taxId` in the request body

### Bill / POS display

When a product is scanned or added to a bill:
- The product detail response includes `tax: { name, rate }` — display the tax label on the bill item row, e.g. `"Tax: Standard Tax (16%)"` or just `"16%"` depending on the POS layout
- Bill summary section already shows `Tax Amount` — no structural change needed, just ensure the label is displayed
- Bill detail view already renders `taxAmount` per item and at header level — add a tax-name column/chip if the design supports it
- Bill PDF already includes tax totals — add tax name to the line item row if the PDF template supports it

---

## Migration plan

1. Add `ECoreTableName.Taxes = 'taxes'` to `e-core-table-name.ts`.
2. Create `infrastructure/persistence/entities/tax.entity.ts`.
3. Add `taxId` column and `tax` relation to `product.entity.ts`.
4. Run `npm run migration:generate` — produces one migration covering both DDL changes.
5. Add the migration file to `migrations/index.ts` barrel.
6. Run `npm run migration:up`.
7. Run the tax-default seeder.

---

## Module wiring

Register `TaxesModule` in `ApplicationModule`:

```ts
imports: [..., TaxesModule]
```

Register `TaxRepo` in the infrastructure providers and inject via `TAX_REPO` token inside `TaxesModule`.

`ProductsModule` does not import `TaxesModule` — the product entity joins via TypeORM relation; no CQRS cross-dependency. `TaxResponse` is imported from the taxes module barrel into `ProductProfile` for the nested mapping.

---

## Non-regression requirements

- Existing bills with manually entered `taxRate` values are unaffected — the snapshot columns remain as stored.
- Products with no `taxId` assigned bill at 0% — no exception is thrown.
- `bill-totals.ts` (`computeBillItemTotals`, `applyBillTotals`) is not modified.
- `UpdateBillItemCommandHandler` behavior is unchanged — explicit override is preserved.
- Existing product create/update flows continue to work when `taxId` is not supplied.

---

## Testing strategy

### Backend unit tests

- `CreateTaxCommandHandler`: creates tax scoped to org.
- `UpdateTaxCommandHandler`: updates rate; does not affect existing bill snapshots.
- `DeleteTaxCommandHandler`: soft-deletes; product's `taxId` FK remains but `is_active = false`.
- `AddBillItemCommandHandler`: when `taxRate` not provided, resolves from `product.tax.rate`.
- `AddBillItemCommandHandler`: when `taxRate = 0` is explicitly sent, uses 0 (no auto-resolve override).
- `AddBillItemCommandHandler`: product with no tax assigned results in `taxRate = 0`.
- `CreateBillCommandHandler`: basket items without `taxRate` resolve from their respective products.
- Tax rate validation: `rate < 0` or `rate > 100` is rejected at the DTO layer.

### Controller / access tests

- `GET /taxes` returns only taxes for the authenticated user's org.
- `POST /taxes` creates tax under the user's org regardless of `organizationId` in body.
- `DELETE /taxes/:id` of another org's tax returns 404.

### Frontend tests

- Tax list page renders org taxes and "New Tax" action.
- Create Tax modal validates rate bounds (0–100).
- Product form Tax dropdown populates from `/taxes/list`.
- Saving a product with a selected tax sends `taxId` in the request.
- Bill item row displays tax label when product has an assigned tax.
- Bill summary shows correct `taxAmount` derived from auto-populated rate.
