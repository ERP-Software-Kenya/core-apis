# Mobile ERP Companion — Design Spec

**Date:** 2026-11-01  
**Status:** Approved  
**Target users:** OrgAdmin · BranchManager  
**Platform:** React Native + Expo (Android + iOS)  
**Backend:** Existing core-apis (NestJS) — no new endpoints required for V1

---

## 1. Scope

The mobile app is a companion to the existing desktop ERP. It does not replace the desktop — it gives OrgAdmins and BranchManagers the ability to manage day-to-day sales, purchases, and inventory from their phone.

**In scope (V1):**
- Home dashboard
- Sales module (Orders + Quotations + Returns)
- Purchase module (Purchase Orders + Returns)
- Inventory module (Stock + Transfers)
- Customers (view + add + contact)
- Suppliers (view + add + contact)
- Profile & Settings

**Out of scope (V1):**
- Warehouse employee flows (Driver, Packer roles)
- Reports module
- Expenses module
- Activity logs
- Approval workflows
- Offline mode

---

## 2. Users & Permissions

Only two roles access the mobile app. Permissions are enforced server-side by existing guards — the mobile app does not manage permissions client-side beyond hiding irrelevant UI.

| Role | Data scope | Org switcher |
|---|---|---|
| OrgAdmin | All branches and locations (`hasOrgWideAccess = true`) | Yes — if they manage multiple orgs |
| BranchManager | Their assigned branch and locations only | No |

Both roles have access to the same screens. Data returned by the backend is already scoped correctly by the existing `assertLocationAccess`, `requireOrganizationId`, and `hasOrgWideAccess` checks in every controller.

---

## 3. Navigation

Bottom tab bar with five tabs.

```
Home  |  Sales  |  Purchase  |  Inventory  |  More
```

| Tab | Icon | Content |
|---|---|---|
| Home | House | Dashboard — KPI cards + quick actions + recent orders |
| Sales | Cart | Sub-tabs: Orders · Quotations · Returns |
| Purchase | Bag | Sub-tabs: Orders · Returns |
| Inventory | Box | Sub-tabs: Stock · Transfers |
| More | Ellipsis | List: Customers · Suppliers · Profile & Settings |

---

## 4. Home Dashboard

### Layout
1. Greeting bar — user name, date, active branch/org label, notification bell
2. Four KPI cards (2×2 grid)
3. Four quick action buttons (2×2 grid)
4. Recent orders list (last 5)

### KPI Cards

| Card | API | OrgAdmin scope | BranchManager scope |
|---|---|---|---|
| Total Sales (month) | `GET /v1/analytics` | All branches | Own branch |
| Total Purchases (month) | `GET /v1/purchase-orders` | All branches | Own branch |
| Receivables | `GET /v1/payment-transactions` | All | Branch |
| Inventory Value + low-stock count | `GET /v1/inventory/valuation` + `GET /v1/inventory/low-stock` | All locations | Own location |

### Quick Action Buttons
These are navigation shortcuts — they deep-link directly to the creation flow inside the relevant module tab.

- **New Sale Order** → Sales → Orders → Create
- **New Quotation** → Sales → Quotations → Create
- **New Purchase Order** → Purchase → Orders → Create
- **Stock Transfer** → Inventory → Transfers → Create

### Recent Orders
Last 5 orders from `GET /v1/orders?page=1&perPage=5`, scoped by role. Shows customer name, order number, amount, and payment status badge.

---

## 5. Sales Module

Three sub-tabs rendered as pill chips below the screen title: **Orders · Quotations · Returns**.

### 5.1 Orders Sub-tab

**List screen**
- Search bar (`GET /v1/orders?search=`)
- Status filter chips: All · Pending · Paid · Partial
- Each row: customer name, order number, date, item count, amount, status badge
- FAB: **+ New Order**

**Order detail screen**
- Header: order number, customer name, date, status badge
- Items section: product name, qty, line total, order total
- Payment section: amount paid, outstanding balance
- Action buttons:
  - **Record Payment** — amount, payment method (Cash / Bank / UPI), date → `POST /v1/payment-transactions`
  - **Invoice PDF** — generate and share via system share sheet → `POST /v1/invoices`
  - **Sales Return** — navigates to create return pre-filled with this order → `POST /v1/sales-returns`
  - **Call Customer** — `tel:` deep-link

**Create order flow**
1. Select customer (search existing or tap + to add new)
2. Select location — defaults to the user's branch default location, changeable before adding products. This single location applies to the entire order; there is no per-product location picker on mobile.
3. Add products — search by name or scan barcode
4. Set quantity, apply discount and tax per line
5. Review total, submit → `POST /v1/orders`

> **Stock removal rule:** all products in a mobile order are deducted from the one location selected at step 2. The desktop's per-line-item location picker is not available on mobile.

### 5.2 Quotations Sub-tab

**List screen**
- Search bar
- Status filter chips: All · Draft · Sent · Converted
- Each row: customer name, quote number, validity date, amount, status badge
- FAB: **+ New Quotation**

**Quotation detail screen**
- Header: quote number, customer name, validity date, status badge
- Items section: product name, qty, line total, quote total
- Action buttons:
  - **Convert to Order** — one tap → `POST /v1/quotations/:id/convert-to-order`
  - **Send Email** — sends quote to customer email → `POST /v1/quotations/:id/send-email`
  - **Revise** — edit items and prices on a sent quote → `PUT /v1/quotations/:id/revise`
  - **Call Customer** — `tel:` deep-link

**Create quotation flow**
1. Select customer
2. Add products + qty
3. Set validity date, apply discount
4. Review, submit → `POST /v1/quotations`

### 5.3 Returns Sub-tab

**List screen**
- Search bar
- Status filter chips: All · Draft · Finalized · Cancelled
- FAB: **+ New Return**

**Return detail screen**
- Header: return number, linked order number, date, status badge
- Items section: product name, qty returned, reason
- Action buttons: **Finalize** → `POST /v1/sales-returns/:id/finalize` · **Cancel** → `POST /v1/sales-returns/:id/cancel`

**Create return flow**
1. Select original order (search by order number or customer)
2. Select items to return and quantities
3. Enter reason
4. Submit → `POST /v1/sales-returns`

---

## 6. Purchase Module

Two sub-tabs: **Orders · Returns**.

### 6.1 Orders Sub-tab

**List screen**
- Search bar (`GET /v1/purchase-orders?search=`)
- Status filter chips: All · Draft · Ordered · Received · Paid
- Each row: supplier name, PO number, date, item count, amount, status badge
- FAB: **+ New PO**

**PO detail screen**
- Header: PO number, supplier name, expected delivery date, status badge
- Items section: product name, qty ordered, line total, PO total
- Payment section: amount paid, outstanding
- Six action buttons:
  - **Receive Goods (GRN)** — enter received qty per line item, add delivery note → `POST /v1/purchase-orders/:id/receive`
  - **Allocate Stock** — select warehouse location, confirm qty per item → `POST /v1/purchase-orders/:id/allocate` (updates inventory)
  - **Record Payment** — amount, method, date, note → `POST /v1/purchase-orders/:id/payments`
  - **Export PDF** — generate and share PO → `GET /v1/purchase-orders/:id/pdf`
  - **Raise Return** — navigates to create purchase return → `POST /v1/purchase-returns`
  - **Payment History** — list of all payments made → `GET /v1/purchase-orders/:id/payments`

**Receive Goods (GRN) flow**
- Per-item stepper (− / quantity / +) pre-filled with ordered qty
- Items short-received show a warning label
- Optional delivery note text field
- Confirm → `POST /v1/purchase-orders/:id/receive`

**Allocate Stock flow**
- Location dropdown (only locations the user can access)
- Per-item stepper showing received qty, editable
- Optional notes field
- Confirm → `POST /v1/purchase-orders/:id/allocate` (stock added to inventory immediately)

**Create PO flow**
1. Select supplier
2. Add items + qty + unit price
3. Set expected delivery date
4. Submit → `POST /v1/purchase-orders`

### 6.2 Returns Sub-tab

**List screen**
- Search, status filter: All · Draft · Finalized · Cancelled
- FAB: **+ New Return**

**Return detail screen**
- Action buttons:
  - **Finalize** → `POST /v1/purchase-returns/:id/finalize`
  - **Record Refund** — log refund received from supplier → `POST /v1/purchase-returns/:id/record-refund`
  - **Cancel** → `POST /v1/purchase-returns/:id/cancel`

**Create return flow**
1. Select original PO
2. Select items to return + qty
3. Enter reason
4. Submit → `POST /v1/purchase-returns`

---

## 7. Inventory Module

Two sub-tabs: **Stock · Transfers**.

### 7.1 Stock Sub-tab

**List screen**
- Valuation summary card at top — total stock value + low-stock item count → `GET /v1/inventory/valuation` + `GET /v1/inventory/low-stock`
- Search bar + barcode scan button (camera icon)
- Filter chips: All · Low Stock
- Location dropdown filter (warehouses accessible to the user)
- Each row: product name, SKU, warehouse, on-hand qty, status (In Stock / Low Stock / Out of Stock)

**Barcode scan**
- Opens device camera via Expo Camera
- On successful scan: calls `GET /v1/inventory?search=<sku>`
- Shows matched product with available qty and location
- Buttons: **View Item** (navigate to detail) · **Scan Another**
- Manual entry fallback if camera unavailable

**Inventory item detail screen**
- Three qty cards: On-hand · Available · Reserved
- Locations section: qty breakdown per warehouse location
- Settings section (inline editable): Reorder level · Max stock → `PUT /v1/inventory/:id`
- Action buttons:
  - **Transfer Stock** — shortcut to create transfer pre-filled with this product
  - **Movement History** — stock-in/out log → `GET /v1/stock-movements/by-inventory/:id`

### 7.2 Transfers Sub-tab

**List screen**
- Search bar
- Status filter chips: All · Pending · Completed · Cancelled
- Each row: from → to location, transfer number, date, item count, status
- FAB: **+ New Transfer**

**Transfer detail screen**
- From/to locations, items and quantities
- Action buttons:
  - **Complete** → `POST /v1/stock-transfers/:id/complete`
  - **Cancel** → `POST /v1/stock-transfers/:id/cancel`

**Create transfer flow**
1. Select from-location (dropdown, scoped to accessible locations)
2. Select to-location
3. Add items + qty (search or scan)
4. Submit → `POST /v1/stock-transfers`

---

## 8. More Menu

Tapping More opens a simple list with three rows: Customers · Suppliers · Profile & Settings.

### 8.1 Customers

**List screen**
- Search by name or phone number → `GET /v1/customers?search=`
- Each row: customer name, phone, outstanding balance (red if > 0, green if zero)
- **+ Add** button top-right

**Customer detail screen**
- Contact info: name, phone, address
- Outstanding balance + credit limit
- Quick actions per row:
  - **View Orders** — navigates to Sales → Orders filtered by this customer → `GET /v1/orders?customerId=`
  - **Call** — `tel:` deep-link to device dialer
  - **WhatsApp** — `whatsapp://send?phone=` deep-link

**Add customer**
- Name, phone, address, credit limit → `POST /v1/customers`

### 8.2 Suppliers

Same pattern as Customers with purchase-order context.

**List screen** → `GET /v1/suppliers?search=`  
Each row shows outstanding payable.

**Supplier detail screen**
- Quick actions: **View POs** → `GET /v1/purchase-orders?supplierId=` · **Call** · **WhatsApp**

**Add supplier** → `POST /v1/suppliers`

### 8.3 Profile & Settings

| Setting | Detail |
|---|---|
| User profile | Name, email, role — read only from Clerk session |
| Organization switcher | OrgAdmin only — switches active Clerk org |
| Branch selector | OrgAdmin can pin to a specific branch; stored as local preference |
| Push notifications | Enable/disable via Expo Notifications; stored as local preference |
| App version | Display only |
| Sign out | Calls Clerk `signOut()`, clears local state, returns to login |

---

## 9. Technology Stack

| Layer | Choice | Reason |
|---|---|---|
| Mobile framework | React Native + Expo | Native camera, push notifications, barcode scanning via Expo APIs; cross-platform |
| Language | TypeScript | Consistent with existing ERP-Client codebase |
| Navigation | Expo Router | File-based routing, tab support, deep-linking |
| API integration | TanStack Query | Caching, background refresh, pagination |
| Auth | Clerk Expo SDK | Reuses existing Clerk setup from core-apis |
| Secure storage | Expo SecureStore | JWT token storage |
| Barcode scanning | Expo Camera | SKU scan for inventory lookup |
| Push notifications | Expo Notifications | Low-stock alerts, order updates |
| UI components | React Native Paper + NativeWind | Consistent with design language shown in mockups |
| PDF sharing | Expo Sharing + Expo FileSystem | Share invoice/PO PDFs via system share sheet |

---

## 10. API Integration Summary

All endpoints are existing core-apis v1 routes. No new backend endpoints are required for V1.

The mobile app authenticates with the same Clerk JWT used by ERP-Client. The token is stored in Expo SecureStore and sent as `Authorization: Bearer <token>` on every request. Backend RBAC guards (`RolesGuard`, `ClerkAuthGuard`) handle authorization — the app does not implement its own permission layer.

### Key endpoint groups used

| Module | Endpoints |
|---|---|
| Auth | Clerk session · `GET /v1/users/me` |
| Dashboard | `GET /v1/analytics` · `/v1/inventory/valuation` · `/v1/inventory/low-stock` · `/v1/orders` |
| Sales — Orders | `GET/POST /v1/orders` · `GET /v1/orders/:id` — location set at order header, not per line item |
| Sales — Quotations | `GET/POST /v1/quotations` · `GET /v1/quotations/:id` · convert · send-email · revise |
| Sales — Returns | `GET/POST /v1/sales-returns` · finalize · cancel |
| Sales — Payments | `POST /v1/payment-transactions` |
| Sales — Invoices | `POST /v1/invoices` |
| Purchase — POs | `GET/POST /v1/purchase-orders` · receive · allocate · payments · pdf |
| Purchase — Returns | `GET/POST /v1/purchase-returns` · finalize · record-refund · cancel |
| Inventory — Stock | `GET /v1/inventory` · low-stock · valuation · `GET/PUT /v1/inventory/:id` |
| Inventory — Movements | `GET /v1/stock-movements/by-inventory/:id` |
| Inventory — Transfers | `GET/POST /v1/stock-transfers` · complete · cancel |
| Customers | `GET/POST /v1/customers` · `GET /v1/customers/:id` |
| Suppliers | `GET/POST /v1/suppliers` · `GET /v1/suppliers/:id` |
| Organizations | `GET /v1/organizations` (org switcher) |

---

## 11. Build Phases

| Phase | Scope |
|---|---|
| 1 — Foundation | Auth (Clerk), organization/branch context, bottom tab nav, Home dashboard, API client setup with TanStack Query |
| 2 — Sales | Orders sub-tab, Quotations sub-tab, Returns sub-tab, payment recording, invoice PDF share |
| 3 — Purchase | PO list and detail, GRN flow, Allocate Stock flow, payment recording, purchase returns |
| 4 — Inventory | Stock list, barcode scan, item detail, movement history, Transfers sub-tab |
| 5 — More | Customers, Suppliers, Profile & Settings, push notification setup |

---

## 12. Implementation Record (as of 2026-11-01)

This section records what has actually been built, what diverged from the design above, and what was deferred. Future sessions should treat this section as the source of truth for current app state.

**PR:** `ERP-Software-Kenya/erp-app#7` — branch `feat/mobile-erp-companion-modules`

---

### 12.1 Auth — Native In-App Forms

**Design said:** Use `useHostedAuth()` (browser redirect to Clerk hosted UI).  
**What was built:** Replaced with fully native in-app auth screens using `@clerk/expo` hooks directly.

#### New / replaced screens under `app/(auth)/`

| File | What it does |
|---|---|
| `login.tsx` | Replaced. Password tab + Email OTP tab + Google OAuth. Uses `useSignIn`, `useOAuth`. |
| `sign-up.tsx` | New. Password tab + Email OTP tab + Google OAuth. Uses `useSignUp`, `useOAuth`. |
| `verify-email.tsx` | New. 6-digit code entry for email verification after password sign-up. Uses `useSignUp`. |
| `verify-second-factor.tsx` | New. 6-digit code entry for MFA after password sign-in. Uses `useSignIn`. |
| `pending-role.tsx` | Unchanged. Shown when user has no assigned role. Has **Check again** + **Sign Out**. |
| `invite/[token].tsx` | Unchanged. Still uses `useHostedAuth()` — kept because the root layout's pending-invitation redirect would conflict with navigating away from the invite screen. |

#### Sign-in flows implemented

- **Password**: email + password → `signIn.create({ strategy: 'password' })` → if `needs_second_factor` → navigate to `verify-second-factor`
- **Email OTP**: email → `signIn.create({ strategy: 'email_code' })` → 6-digit code → `signIn.attemptFirstFactor`
- **Google OAuth**: `useOAuth({ strategy: 'oauth_google' })` → `startOAuthFlow` with deep-link redirect

#### Sign-up flows implemented

- **Password**: email + password → `signUp.create()` → `prepareEmailAddressVerification` → navigate to `verify-email` screen
- **Email OTP**: email → `signUp.create()` → `prepareEmailAddressVerification` → 6-digit code inline → `signUp.attemptEmailAddressVerification` → `setActive`
- **Google OAuth**: same as sign-in

---

### 12.2 User Onboarding Flow

This is the end-to-end path for a brand-new user from zero to using the app:

1. **Download app** → open → `login.tsx` (native form)
2. **Sign up** via Password or Email OTP tab → email verified → Clerk session created
3. **No role yet** → root layout bootstrap detects no known role → routes to `/(auth)/pending-role`
4. **pending-role screen** shows: "Account pending setup — contact your administrator"
   - If user just created their own organization: open **ERP web client** (erp-client) → create organization → system assigns `org-admin` role
   - If invited by an existing org admin: admin sends invite email → user opens invite link → `invite/[token].tsx` handles acceptance
5. **Tap "Check again"** on pending-role screen → `getMeApi()` returns new role → routes to role dashboard
6. **org-admin dashboard** → full access to all modules

#### What the user can do immediately after reaching the dashboard

- **Add products**: More → Products → New Product
- **Add stock**: Purchase → New PO → receive goods on PO detail (stock is added via GRN, not direct entry)
- **Sell**: Sales → New Order
- **Quote**: Sales → Quotations → New Quotation → Convert to Order
- **Purchase**: Purchase → New PO
- **Manage contacts**: More → Customers / Suppliers

---

### 12.3 Modules — Implementation Status

#### Auth
| Screen | Status | Notes |
|---|---|---|
| Login (native) | ✅ Done | Password + OTP + Google |
| Sign-up (native) | ✅ Done | Password + OTP + Google |
| Verify email | ✅ Done | |
| Verify second factor (MFA) | ✅ Done | |
| Pending role | ✅ Done | Pre-existing, unchanged |

#### Sales
| Feature | Status | Notes |
|---|---|---|
| Orders list + search + filter | ✅ Done | |
| Order detail + payment recording | ✅ Done | |
| New order | ✅ Done | |
| Quotations list + filter | ✅ Done | |
| Quotation detail + convert + send email | ✅ Done | |
| New quotation | ✅ Done | |
| Sales returns list + filter | ✅ Done | |
| Return detail + finalize + cancel | ✅ Done | |
| New return | ✅ Done | |

#### Purchase
| Feature | Status | Notes |
|---|---|---|
| Purchase orders list + filter | ✅ Done | |
| PO detail + receive goods + record payment | ✅ Done | |
| Payment history on PO | ✅ Done | |
| New purchase order | ✅ Done | |
| Purchase returns list + filter | ✅ Done | |
| Purchase return detail + finalize + cancel | ✅ Done | |
| New purchase return | ✅ Done | |

#### Inventory
| Feature | Status | Notes |
|---|---|---|
| Stock tab — KPI cards (total value + low-stock count) | ✅ Done | |
| Stock list | ✅ Done | |
| Inventory item detail | ⏭ Deferred | Nav prop `onOpenInventoryItem` is wired but screen not built |
| Barcode scan | ⏭ Deferred | Not built in V1 |
| Transfers list | ✅ Done | List renders, no detail screen |
| Transfer detail + complete + cancel | ⏭ Deferred | User confirmed transfers not needed on mobile for now |
| New transfer | ⏭ Deferred | Same |

#### Contacts (More menu)
| Feature | Status | Notes |
|---|---|---|
| Customer list + search | ✅ Done | Infinite scroll |
| Customer detail + recent orders + call | ✅ Done | |
| Supplier list + search | ✅ Done | Infinite scroll |
| Supplier detail + recent POs + call | ✅ Done | |

#### Products (added beyond original design scope)
| Feature | Status | Notes |
|---|---|---|
| Product list + search | ✅ Done | Infinite scroll, accessible via More → Products |
| Product detail (view mode) | ✅ Done | Pricing card with margin calculation |
| Product edit (inline edit mode) | ✅ Done | Toggle via Edit button on detail screen |
| New product | ✅ Done | Name, SKU, category, description, selling/cost price, tax%, unit picker, weight |

#### Profile / Settings
| Feature | Status | Notes |
|---|---|---|
| More screen with profile card | ✅ Done | Shows role + organizationId |
| Sign out | ✅ Done | |
| Push notifications nav | ✅ Done | Routes to shared notifications screen |
| Organization switcher | ⏭ Not built | Out of scope for V1 |
| Branch selector | ⏭ Not built | Out of scope for V1 |

---

### 12.4 File Structure

#### Shared screen components (business logic lives here)
```
src/screens/manager/
  SalesScreen.tsx              — Orders / Quotations / Returns sub-tabs
  OrderDetailScreen.tsx
  NewOrderScreen.tsx
  QuotationDetailScreen.tsx
  NewQuotationScreen.tsx
  ReturnDetailScreen.tsx
  NewReturnScreen.tsx
  PurchaseScreen.tsx           — Orders / Returns sub-tabs
  PurchaseOrderDetailScreen.tsx
  NewPurchaseOrderScreen.tsx
  PurchaseReturnDetailScreen.tsx
  NewPurchaseReturnScreen.tsx
  InventoryScreen.tsx          — Stock / Transfers sub-tabs
  MoreScreen.tsx
  CustomerListScreen.tsx
  CustomerDetailScreen.tsx
  SupplierListScreen.tsx
  SupplierDetailScreen.tsx
  ProductListScreen.tsx
  ProductDetailScreen.tsx      — view + edit toggle
  NewProductScreen.tsx
```

#### Route wrappers (thin files, inject role-specific paths)
```
app/(org-admin)/          — mirrors app/(branch-manager)/ exactly
  sales.tsx, purchase.tsx, inventory.tsx, more.tsx
  order/[id].tsx, new-order.tsx
  quotation/[id].tsx, new-quotation.tsx
  return/[id].tsx, new-return.tsx
  purchase-order/[id].tsx, new-purchase-order.tsx
  purchase-return/[id].tsx, new-purchase-return.tsx
  customers.tsx, customer/[id].tsx
  suppliers.tsx, supplier/[id].tsx
  products.tsx, product/[id].tsx, new-product.tsx
```

#### API types
```
src/api/manager/
  sales-orders.api.ts
  quotations.api.ts
  sales-returns.api.ts
  purchase-orders.api.ts
  purchase-returns.api.ts
  inventory.api.ts
  customers.api.ts
  suppliers.api.ts
  products.api.ts
  payments.api.ts
  locations.api.ts
```

#### TanStack Query hooks
```
src/hooks/manager/
  useSalesOrders.ts
  useQuotations.ts
  useSalesReturns.ts
  usePurchaseOrders.ts
  usePurchaseReturns.ts
  useInventory.ts
  useCustomers.ts
  useSuppliers.ts
  useProducts.ts
  usePayments.ts
  useLocations.ts
```

---

### 12.5 Design Deviations

| Design decision | What was built instead | Reason |
|---|---|---|
| Products not in original scope | Products module added (list + detail/edit + create) | User requirement added during implementation |
| Stock Transfers in scope | Transfers list visible but detail/create deferred | User confirmed transfers not needed on mobile |
| Inventory item detail in scope | Not built | Deferred — nav prop wired, screen not created |
| Barcode scan | Not built | Deferred for V1 |
| Profile & Settings (org switcher, branch selector) | Only shows role + organizationId + sign out | Deferred |
| WhatsApp deep-link on customer/supplier detail | Not built | Not wired in current screens |
| Add customer / add supplier flows | Not built as separate screens | Customer/supplier creation is handled via the New Order flow's inline customer picker |
| PDF invoice sharing | Not built | Deferred |

---

### 12.6 App Icon

**Before:** Default Expo blue "A" icon  
**After:** Pramukh Digital logo (dark circle with green "P" mark)  

Source file: `D:\ERP\erp-client\assets\app-logo.png` — copied to all icon slots:
- `assets/icon.png` (iOS + fallback)
- `assets/android-icon-foreground.png`
- `assets/android-icon-monochrome.png`
- `assets/splash-icon.png`
- `assets/favicon.png`

Android adaptive icon background changed from `#E6F4FE` to `#000000` to match the logo's dark circle. `backgroundImage` removed from `app.json`.

---

### 12.7 Key Design Patterns for Future Sessions

- **Shared screen / thin wrapper pattern**: All business logic in `src/screens/manager/`. Route wrappers under `app/(org-admin)/` and `app/(branch-manager)/` are 5–12 line files that only inject role-specific navigation paths. Never put business logic in route wrappers.
- **Navigation props**: Every shared screen exports a `*NavProps` interface (e.g. `SalesScreenNavProps`) for its navigation callbacks. Route wrappers receive these and pass `router.push(...)` calls.
- **Hidden screens in layouts**: Every drill-down/create screen must be registered as `<Tabs.Screen name="..." options={{ href: null }} />` in both `app/(org-admin)/_layout.tsx` and `app/(branch-manager)/_layout.tsx`.
- **Infinite scroll**: List screens use `useInfiniteQuery` with FlashList from `@shopify/flash-list`. Search uses `useDeferredValue` for debouncing.
- **Auth store**: `src/store/auth.store.ts` — fields are `isReady`, `userId`, `role`, `locationIds`, `organizationId`, `branchId`. No `organizationName` field exists.
- **Indian Rupee formatting**: `` `₹${n.toLocaleString('en-IN')}` ``
- **Colors**: primary blue `#3b74f5`, navy `#0d1b3e`, surface `#f0f4f8`, border `#dde5f0`, cyan `#09b6e8`
