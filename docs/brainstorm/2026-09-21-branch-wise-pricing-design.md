# Branch-Wise Product Pricing — Design Spec

**Date:** 2026-09-21  
**Status:** Approved for implementation

---

## 1. Overview

Products currently store five price tiers (cost, retail, loyalty, wholesale, transfer) directly on the `products` table — one set of prices per product, org-wide. This feature introduces per-branch price overrides: each branch can have its own prices for any product, overriding the org-level defaults. One branch per org is designated the **main branch**; its prices serve as the canonical reference.

---

## 2. Decisions Made

| Decision | Choice |
|---|---|
| Where branch prices are shown (org admin) | Dedicated **Branch Pricing** page in sidebar |
| Where branch prices are shown (branch manager) | Same page, locked to their branch |
| Branch setup pricing question | Confirmation dialog **after** branch is created |
| Main branch indicator | `is_main` flag on branch; `MAIN` badge in UI |
| Branch price table style | Compact table with per-row Edit/Set action, "Not set" status |

---

## 3. Data Model

### 3.1 `BranchEntity` — add `is_main`

Add one column to the existing `branches` table:

```
is_main  BOOLEAN  NOT NULL  DEFAULT false
```

**Constraint:** at most one row per `organization_id` may have `is_main = true`. Enforced in the `SetMainBranchCommand` handler (read-then-write with org-scoped check), not via a partial unique index (to keep migration simple).

### 3.2 New table: `product_branch_prices`

New entity `ProductBranchPriceEntity` with table name `ECoreTableName.ProductBranchPrices = 'product_branch_prices'`.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | auto-generated |
| `organization_id` | UUID FK → organizations | for org-scoped queries |
| `branch_id` | UUID FK → branches | |
| `product_id` | UUID FK → products | |
| `cost_price` | decimal(18,4) | nullable — null means "not set" |
| `retail_price` | decimal(18,4) | nullable |
| `loyalty_price` | decimal(18,4) | nullable |
| `wholesale_price` | decimal(18,4) | nullable |
| `transfer_price` | decimal(18,4) | nullable |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

**Unique constraint:** `(branch_id, product_id)` — one price row per branch+product pair.

**No delete column** — price rows are upserted, not soft-deleted.

**Price resolution rule (for POS/billing):** when resolving a product's price for a branch, use `product_branch_prices` row if it exists and the specific tier is non-null; otherwise fall back to the org-level price on `products`.

---

## 4. Backend — core-apis

### 4.1 Table name enum

Add to `ECoreTableName`:
```
ProductBranchPrices = 'product_branch_prices'
```

### 4.2 New module: `product-branch-prices`

Location: `src/application/modules/product-branch-prices/`

**Domain model:** `ProductBranchPrice` — mirrors entity fields.

**Commands:**

| Command | Handler action |
|---|---|
| `UpsertBranchProductPriceCommand` | Insert or update a `product_branch_prices` row for a given `(branchId, productId)`. Validates branch and product belong to the same org. |
| `CopyMainBranchPricesToBranchCommand` | Reads all `products` org prices, bulk-upserts into `product_branch_prices` for the target branch. Used after branch creation when user says "Yes, copy now." |

**Queries:**

| Query | Returns |
|---|---|
| `ListBranchProductPricesQuery` | Paginated list of products with their branch-specific prices for a given `branchId`. Joins `products` LEFT JOIN `product_branch_prices` so products with no override still appear (with null prices). |
| `GetBranchProductPriceQuery` | Single `(branchId, productId)` row. |

**Controller:** `ProductBranchPricesController`  
Base path: `/v1/product-branch-prices`

| Method | Path | Roles | Description |
|---|---|---|---|
| `GET` | `/` | OrgAdmin, BranchManager | List products + branch prices. OrgAdmin passes `branchId` query param; BranchManager's `branchId` is injected from their session. |
| `PATCH` | `/:branchId/products/:productId` | OrgAdmin, BranchManager | Upsert prices for one product on a branch. BranchManager can only target their own branch. |
| `POST` | `/:branchId/copy-from-main` | OrgAdmin | Copy all main branch prices to this branch. |

### 4.3 Branch module changes

**`BranchEntity`:** add `is_main` boolean column.  
**`Branch` domain model:** add `isMain` property.  
**`BranchResponse`:** expose `isMain`.  
**`UpdateBranchCommand`:** add optional `isMain` field.

**New command: `SetMainBranchCommand`**  
Handler: within the same org transaction — set `is_main = false` on current main (if any), set `is_main = true` on target branch.

**New endpoint on `BranchesController`:**

| Method | Path | Roles | Description |
|---|---|---|---|
| `PATCH` | `/:id/set-main` | OrgAdmin, SuperAdmin | Sets branch as main; clears previous main. |

### 4.4 Migration

Generate via `npm run migration:generate` after entity changes. Do not write manually.

Migration covers:
1. `ALTER TABLE core.branches ADD COLUMN is_main BOOLEAN NOT NULL DEFAULT false`
2. `CREATE TABLE core.product_branch_prices (…)` with unique constraint on `(branch_id, product_id)`

---

## 5. Frontend — ERP-Client

### 5.1 Types (`renderer/src/types.ts`)

Add to `Branch` interface:
```ts
isMain?: boolean;
```

New interface:
```ts
export interface ProductBranchPrice {
  id: string;
  branchId: string;
  productId: string;
  productName: string;
  sku?: string;
  costPrice: number | null;
  retailPrice: number | null;
  loyaltyPrice: number | null;
  wholesalePrice: number | null;
  transferPrice: number | null;
}
```

### 5.2 API hooks (`renderer/src/api/`)

New file: `product-branch-prices.ts`
- `useListBranchProductPrices(branchId, filters)` — paginated
- `useUpsertBranchProductPrice()` — mutation
- `useCopyMainBranchPrices(branchId)` — mutation

### 5.3 New page: Branch Pricing (`renderer/src/pages/BranchPricing/`)

**Org Admin experience:**
- Branch dropdown filter (defaults to first branch). Shows all branches.
- Product search input.
- Status filter: All / Set / Not set.
- Table columns: Product, Retail, Wholesale, Loyalty, Transfer, Status, Actions.
- "Not set" rows show `—` in price columns and an orange `○ Not set` badge.
- Edit/Set opens `SetBranchPriceDialog` (reuses style of existing `SetPriceDialog`).

**Branch Manager experience:**
- No branch selector — branch locked to session `branchId`.
- Blue branch badge shown as identifier.
- Same table without branch column.
- Can edit only their own branch's prices.

**`SetBranchPriceDialog`:** same fields as `SetPriceDialog` (retail, cost, loyalty, wholesale, transfer) plus a "Reset to org prices" button that clears the branch override.

### 5.4 Branches page changes (`renderer/src/pages/Branches/`)

- `MAIN` badge next to branch name in table for the branch where `isMain === true`.
- `⋯` dropdown for non-main branches gains **"Set as Main Branch"** item (org admin only).
- Clicking "Set as Main Branch" calls `PATCH /api/v1/branches/:id/set-main` then refetches.

### 5.5 Branch create flow — post-save confirmation dialog

After `createMutation.onSuccess`:
- Show a `ConfirmDialog`-style modal: _"Would you like to copy product prices from the main branch to [Branch Name] now?"_
- **Yes, copy now** → calls `POST /api/v1/product-branch-prices/:branchId/copy-from-main`, then closes.
- **No, I'll set prices later** → closes dialog, no further action.
- If no main branch exists in the org, skip the dialog entirely.

### 5.6 Navigation

Add "Branch Pricing" route to sidebar, visible to OrgAdmin and BranchManager. Place under the Inventory section, below Products.

---

## 6. Access Control Summary

| Action | OrgAdmin | BranchManager |
|---|---|---|
| View Branch Pricing page | All branches | Own branch only |
| Edit branch product prices | Any branch | Own branch only |
| Copy main branch prices to a branch | Yes | No |
| Set branch as main | Yes | No |
| View `isMain` badge | Yes | Yes |

---

## 7. Edge Cases

- **No main branch yet:** `copy-from-main` endpoint returns 400 if no `is_main = true` branch exists in the org. Post-create dialog is skipped client-side if `branches.find(b => b.isMain)` returns nothing.
- **Main branch prices are org-level prices:** The main branch row in `product_branch_prices` uses the org-level prices copied at the moment of the copy action. It is not auto-synced when org prices change — branch manager must re-copy or edit manually.
- **Partial prices:** All five price fields are nullable independently. A branch can override only retail price and leave others null (falling back to org price per tier).
- **Branch deactivation:** Deactivating a branch does not delete its `product_branch_prices` rows. If reactivated, prices are still there.
- **Deleting main branch flag:** Setting another branch as main only clears `is_main` on the old one — does not touch any price rows.

---

## 8. Out of Scope

- Auto-sync of branch prices when org prices change (future).
- Bulk import of branch prices via CSV (future).
- Price history / audit log for branch price changes (future — existing `ProductLog` pattern can be extended).
