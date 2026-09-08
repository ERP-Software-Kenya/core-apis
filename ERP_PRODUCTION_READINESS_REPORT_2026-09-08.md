# ERP Production Readiness Report

Date: 2026-09-08  
Scope: `ERP-Client` desktop renderer, `core-apis` backend folder, deployed API `https://core-apis-m03n.onrender.com`  
Grounding: local folders/docs only, per instruction not to use ChainIT.

## Verdict

**Not production-ready until the patched backend/client are deployed and retested.** Core sales, purchase, credit, black-stock, and black-to-white stock operations mostly behaved correctly in the deployed API. The accounting/analytics and frontend wiring defects found in this report have been patched locally, but the deployed API has not been updated from these local changes during this session.

## Current Status Snapshot

| Category | Status |
|---|---:|
| Core ERP stock flow | Passed live regression for purchase allocation, normal sale, credit sale, black sale, and black-to-white conversion |
| Local backend fixes | Applied on latest `develop` and build/test passing |
| Local frontend fixes | Applied and build/test passing |
| Store/branch isolation | Store and branch analytics access patched locally; deploy/live retest still required |
| Reports module | Aggregate reports now include source records in `reportData` locally; deploy/live retest still required |
| Frontend module usage | 41 of 42 backend modules referenced by ERP-Client; only `mail` is unused at module level |
| Production release | No-go until deployment, production auth config, vulnerability triage, and live retest |

## Completed Work

The following items have been completed in the local `core-apis` and `ERP-Client` folders and verified with build/test checks:

| Area | Completed work | Verification |
|---|---|---:|
| Sales stock flow | Regressed purchase allocation, normal sale, credit sale, black sale, and black-to-white conversion against the deployed API. Stock add/remove behavior matched expected results in the tested core flows. | Live regression |
| Bill payment method persistence | Fixed completed bills so `paymentMethod` is persisted/defaulted, which allows payment-mix analytics to classify cash/credit/bank/mobile payments instead of falling into `Other`. | Backend build/tests |
| Purchase analytics | Fixed purchase summary/trend/category/supplier analytics to count received, partially allocated, and allocated purchase orders as completed purchase spend. | Backend build/tests |
| Dashboard filters | Added branch-based dashboard filtering with `branchId` query params and consistent `period/from/to` timeline params across sales, purchase, and inventory analytics. | Backend/client build/tests |
| Inventory timeline analytics | Inventory dashboard summary, stock by location, stock value by category, status, dead stock, status trend, damage summary, and fast-moving products now respect dashboard period/location/branch filters locally. | Backend build/tests |
| Store/branch isolation | Tightened org-wide access so branch/store managers are scoped to assigned branches/stores; sales, inventory, black stock, branch list, and analytics paths now apply scoped access locally. | Backend build/tests |
| Frontend API wiring | Replaced missing frontend API paths `/inventory/by-product/:id` and `/users/directory` with existing backend-supported APIs. | Client build/tests |
| Auth boot and onboarding recovery | Fixed possible stuck states in auth boot, email verification, second-factor verification, SSO continuation, and organization creation rollback. | Client build/tests and headless screen checks |
| Reports data payloads | Report generation now returns `reportData` in the API response and includes row-level `records` for sales, purchase, expense, cash, profit, inventory, customer, credit, return, supplier payment, and comparison reports. | Backend/client build/tests |
| Reports scoping | Returned-items reports are now organization-scoped, and location-filtered purchase reports use purchase item allocation locations instead of a stale purchase-order location field. | Backend build/tests |
| Module usage audit | Completed module-level dead-code audit between backend controllers and ERP client references. Only `mail` is unused by the client at module level. | Static audit |
| Production readiness report | Consolidated findings, fixes, remaining blockers, module audit, auth/onboarding audit, branch/store audit, reports audit, and verification results into this root markdown report. | This document |

Items completed locally are **not the same as production-ready** until the patched backend/client are deployed and the live regression is rerun against the release environment.

## Fixes Applied Locally

| Area | Fix | Status |
|---|---|---:|
| Bill payment method persistence | `TransitionBillStatusCommandHandler` now passes `paymentMethod` into `BillCompletionService`; completion persists it and defaults missing credit sales to `CREDIT`, other sales to `CASH`. | Fixed locally |
| Payment-mix analytics | New completed bills should now bucket into `Cash`, `Credit`, `Bank`, `M-Pesa`, or `Other` based on persisted `payment_method`. | Pending deploy retest |
| Purchase summary/trend analytics | Purchase analytics now treats `received`, `partially_allocated`, and `allocated` POs as completed spend states, and supplier count is scoped to completed/date-matching rows. | Fixed locally |
| Frontend `/inventory/by-product/:id` mismatch | Client now uses deployed Swagger-backed `/api/v1/inventory?productId=...` and reads `items`. | Fixed locally |
| Frontend `/users/directory` mismatch | Client now builds the lightweight directory from existing `/api/v1/users` instead of a non-Swagger endpoint. | Fixed locally |
| Renderer env risk | Removed committed dev bypass enablement and the credential-like deployment token from `renderer/.env`. | Fixed locally |
| Auth boot recovery | `AuthProvider` now processes the current Clerk session immediately after `clerk.load()` instead of relying only on the listener callback, preventing an indefinite start screen if the listener does not fire. | Fixed locally |
| Verification recovery | `/verify-email`, `/verify-second-factor`, and `/sso-continue` now catch Clerk bootstrap/preparation errors and show a recoverable back action instead of staying on `Preparing...`. | Fixed locally |
| Organization onboarding rollback | `CreateOrganization` no longer destroys the Clerk org if backend org creation already succeeded but a later refresh/navigation step fails. | Fixed locally |
| Auth/onboarding screens | Rechecked `/signup`, `/sso-continue`, `/login`, and second-factor routing after changes. Screens render; full protected shell still requires MFA code. | Partially verified |
| Store-scoped role policy | `hasOrgWideAccess` is now true only for `super_admin`, `org_admin`, and `org_manager`; `store_manager`/`store_staff` require explicit `user_roles.store_id` assignments. | Fixed locally |
| Branch-scoped role policy | Latest `develop` adds `branch_manager`, `user_roles.branch_id`, branch entities, and auth expansion from branch assignments to all locations in that branch. `branch_manager` is no longer treated as org-wide when unscoped. | Fixed locally |
| Dashboard branch-scoped analytics | `/auth/me` now exposes `branchIds`; dashboard selector uses branches and sends `branchId` query params; backend analytics applies branch, legacy location, and allowed-location filters consistently. | Fixed locally |
| Dashboard timeline analytics | Inventory snapshot analytics now evaluate stock as of the selected period end; sales, purchase, and inventory dashboard analytics receive the same `period/from/to` query params. | Fixed locally |
| Sales/store data isolation | Bills list/detail/export/update/status/item endpoints now enforce `locationId` access and auto-scope unfiltered lists to the token's assigned stores. | Fixed locally |
| Black-stock isolation | Unpublished stock list/detail/movement endpoints now enforce assigned-store access, matching add/publish protections. | Fixed locally |
| Inventory scoped screens | POS, Orders, and Stock Movements now request inventory for the selected store instead of unfiltered inventory, preventing store users from hitting backend 403s. | Fixed locally |
| Inventory summary endpoints | Low-stock and valuation responses are filtered to assigned stores for non-org-wide users. | Fixed locally |
| Branch list isolation | Branch list now scopes branch/store users to assigned branches or to branches behind their assigned stores instead of listing every branch in the organization. | Fixed locally |
| Report data payloads | `ReportGenerationLogResponse` now exposes `reportData`; total sales, cash sales, credit sales, total bills, average bill value, expense, cash, purchase, return, customer, credit, supplier payment, profit, inventory, and comparison reports now include row-level `records` plus PDF table rows where data exists. | Fixed locally |
| Report org scoping | Returned-items reports now scope through `locations.organization_id`; purchase reports no longer rely on stale `purchase_orders.location_id` and use allocation locations for location-specific filtering. | Fixed locally |

## Deep Regression Summary

Fresh QA records were created in the deployed dev database on 2026-09-08. Latest deep run: 72 passed checks, 4 failed checks, 5 warnings.

| Scenario | Expected | Actual | Result |
|---|---:|---:|---:|
| Purchase PO total | 10 units * 12 = 120 | 120 | Pass |
| Receive PO before allocation | stock remains 0 | 0 | Pass |
| Allocate received PO | official stock 0 -> 10 | 10 | Pass |
| Normal cash sale | sell 3 units for 60, stock 10 -> 7 | 60, stock 7 | Pass |
| Credit sale | sell 2 units for 40, stock 7 -> 5 | 40, stock 5 | Pass |
| Customer credit balance | balance increases by 40 | 40 | Pass |
| Add black stock | black stock 0 -> 6 | 6 | Pass |
| Black sale | sell 2 units for 60; official stock unchanged | official stock unchanged | Pass |
| Black stock deduction | black stock 6 -> 4 | 4 | Pass |
| Publish black to white | official stock +1, black stock -1 | official 6, black 3 | Pass |
| Sales analytics | revenue 160, 3 completed bills, avg 53.33 | matched | Pass |
| Inventory analytics | 1 SKU, valuation 6 * 12 = 72 | matched | Pass |
| Payment-mix analytics | Cash 120, Credit 40 | `Other: 160` | **Fail** |
| Purchase analytics | spend 120, supplier count 1 | spend 0, supplier count 7 | **Fail** |

Latest run IDs: product `ed050bf8-2be0-4264-95ae-11b21ab15795`, location `7731e111-41b0-486e-a1b0-e11499ba7ab6`, PO `3b9f9414-6310-4c81-870b-f31b539b5762`, normal bill `dcd88a2f-2a7d-4c23-b177-1490892dd9b5`, credit bill `04ad4588-2b0b-4697-a842-df3f3ae3876c`, black bill `7db64688-c7e0-46ac-9cb6-f05f4cd54a80`.

## Release Blockers

1. **Payment method was not persisted into completed bills, breaking revenue analytics.**  
   Completing normal and black bills with `paymentMethod: 'CASH'`, and a credit bill with `paymentMethod: 'CREDIT'`, returned completed bills with `paymentMethod: null`. As a result, `/api/v1/analytics/payment-mix` grouped all `160` revenue as `Other`, not `Cash=120` and `Credit=40`. The analytics query only buckets known `payment_method` values: [get-payment-mix.handler.ts](/home/parth/workspace-personal/core-apis/src/application/modules/analytics/queries/get-payment-mix/get-payment-mix.handler.ts:15).
   **Local fix applied:** [bill-completion.service.ts](/home/parth/workspace-personal/core-apis/src/application/shared/services/bill-completion.service.ts:64), [transition-bill-status.command-handler.ts](/home/parth/workspace-personal/core-apis/src/application/modules/bills/commands/transition-bill-status/transition-bill-status.command-handler.ts:40).

2. **Purchase analytics excluded allocated purchase orders and over-counted suppliers.**  
   The tested PO was received and allocated, stock increased correctly, but `/api/v1/analytics/purchase-summary` returned `spendThisMonth=0` instead of `120`. The local handler only sums `status = 'received'`, while the completed operational flow moves beyond that state: [get-purchase-summary.handler.ts](/home/parth/workspace-personal/core-apis/src/application/modules/analytics/queries/get-purchase-summary/get-purchase-summary.handler.ts:32). Supplier count also returned `7` for a new isolated QA location, indicating the query is not correctly date-scoped and/or status-scoped.
   **Local fix applied:** [get-purchase-summary.handler.ts](/home/parth/workspace-personal/core-apis/src/application/modules/analytics/queries/get-purchase-summary/get-purchase-summary.handler.ts:14), [get-purchase-trend.handler.ts](/home/parth/workspace-personal/core-apis/src/application/modules/analytics/queries/get-purchase-trend/get-purchase-trend.handler.ts:13).

3. **Local `core-apis` source still does not fully match the deployed API contract.**  
   Latest `develop` now includes branch modules and `branchId` on locations, but the local source still needs deployment verification against `POST /api/v1/auth/login` and the deployed Swagger contract before release.

4. **Authentication is not production-ready in the desktop client configuration.**  
   The renderer uses Clerk directly for password login: [SignIn/index.tsx](/home/parth/workspace-personal/ERP-Client/renderer/src/pages/SignIn/index.tsx:50), then passes `clerk.session.getToken()` to API calls: [AuthContext.tsx](/home/parth/workspace-personal/ERP-Client/renderer/src/context/AuthContext.tsx:28). Headless auth regression showed the app is loading Clerk development keys and the provided account stops at `/verify-second-factor`; protected app-shell login could not be completed without the emailed code. Production must use live Clerk keys, verified redirects, and a documented MFA/recovery flow.

5. **Sensitive/development configuration was committed in `renderer/.env`.**  
   The renderer env file contained duplicate development Clerk/API config, `VITE_DEV_BYPASS_AUTH=true`, and a credential-like deployment token. The local file was cleaned so dev bypass is false and the token is removed, but any exposed token must still be rotated and production values must come from environment/CI secrets only.

6. **Dependency and runtime readiness are not clean.**  
   `core-apis npm install` only succeeded with `--legacy-peer-deps` because `@automapper/classes@9.0.2` wants TypeScript `^6.0.0` while the project declares TypeScript `^5.7.3`. `ERP-Client` installed with Node engine warnings because Electron 43 tooling requires Node `>=22.12.0`; this machine is Node `20.19.4`.

7. **Security audit has high vulnerabilities.**  
   `core-apis`: 8 vulnerabilities, including 2 high. `ERP-Client`: 29 vulnerabilities, including 14 high. Do not release until high-impact runtime/package issues are triaged or remediated.

8. **Purchase order ownership is still not branch/store-scoped at creation time.**  
   Latest `develop` keeps purchase orders as organization-level records with no `branchId` or `locationId` on `CreatePurchaseOrderRequest`: [create-purchaseorder.request.ts](/home/parth/workspace-personal/core-apis/src/application/modules/purchase-orders/models/requests/create-purchaseorder.request.ts:11). The controller remains admin-only. Allocation now checks destination location access, but a true “branch manager can purchase only for his branch” flow needs persisted PO branch/location ownership or a documented design that branch managers create only branch-scoped POs.

9. **Dashboard branch/timeline filters require deploy and live regression.**  
   Local backend/client code now supports `branchId` plus `period/from/to` across sales, purchase, and inventory dashboard analytics. Branch filters are expanded through branch-owned stores, and scoped users remain limited to their token `locationIds`. Inventory snapshot cards now calculate as of the selected period end using stock movement snapshots where available. This is fixed locally, but must be validated against the deployed API and production-like data before release.

10. **Reports module fixes require deploy and live regression.**  
   The deployed behavior observed by code review generated several report types as totals only, with no source records in the API response because `ReportGenerationLogResponse` did not expose `reportData`. Local code now stores and returns structured report data, but production release still needs a deployed regression that generates each report type and verifies totals equal the included records.

## Reports Module Audit

| Report family | Local behavior after fix | Status |
|---|---|---:|
| Sales reports | `total_sales`, `cash_sales`, `credit_sales`, `total_bills`, and `average_bill_value` now include completed bill records with bill number, date, customer, location, payment method, sale type, item count, and amount. | Fixed locally |
| Sales breakdown reports | `time_wise_sales`, `top_selling_products`, `slow_moving_products`, and `weekly_comparison` now preserve raw aggregate rows in `reportData.records` and render detailed PDF rows. | Fixed locally |
| Expense reports | `total_expense`, `shop_expense`, and `other_expense` now include expense rows with date, category, description, location, status, and amount. | Fixed locally |
| Cash reports | `opening_cash` and `closing_cash` now include the payment transaction rows used to compute the cash balance. | Fixed locally |
| Purchase reports | `total_purchase`, `purchase_return`, `supplier_payment`, and `pending_supplier_payment` now include purchase/return/payment source rows. Location-filtered purchase reports use purchase item allocations instead of a stale PO location column. | Fixed locally |
| Profit reports | `total_profit` and `net_profit` still show revenue/COGS/expense summaries and now include the contributing completed bill rows. | Fixed locally |
| Inventory reports | `closing_stock`, `low_stock_items`, `out_of_stock_items`, and `damaged_stock` now preserve raw inventory/stock rows in `reportData.records`. | Fixed locally |
| Customer and credit reports | `total_customers`, `new_customers`, `repeat_customers`, `credit_given`, `credit_received`, and `pending_credit` now include customer or credit transaction source rows. | Fixed locally |
| Staff attendance | Returns `N/A` because no HR/attendance module data exists in the ERP schema. | Known gap |
| API response | `reportData` is now present on `ReportGenerationLogResponse` and typed in the ERP client. | Fixed locally |
| Frontend display | Current Report Generation page lists generated jobs and downloads PDFs; it does not yet provide an in-app detail drawer/table for `reportData.records`. PDF download and API response contain the detail data. | Remaining enhancement |

## Store And Branch Access Audit

Current local model:

| Layer | Finding | Status |
|---|---|---:|
| Auth token | `/auth/me` carries `roles`, `locationIds`, and `hasOrgWideAccess`. | Present |
| Branch expansion | Branch-scoped user roles are expanded to all locations inside assigned branches during Clerk JWT validation. | Present |
| Org-wide access | Previously any unscoped `user_roles` row or any org membership could grant all-store visibility. Now only `super_admin`, `org_admin`, and `org_manager` do. | Fixed locally |
| Store manager access | `store_manager`/`store_staff` must have explicit `user_roles.store_id` records. Missing store assignment now becomes a 403 on scoped endpoints instead of all-store access. | Fixed locally |
| Branch manager access | `branch_manager` exists and is scoped through `user_roles.branch_id`; assigned branch locations are used by location/inventory/sales access checks. | Partial |
| Branch list access | Branch/store users are now limited to assigned branches or the branches behind assigned stores. | Fixed locally |
| Dashboard branch filter | Dashboard selector now uses branches, sends `branchId` query params, and backend analytics expands a branch through its included stores while preserving legacy `locationId` support. | Fixed locally |
| Dashboard timeline filter | Sales, purchase, and inventory dashboard analytics now receive `period/from/to`; inventory snapshot widgets calculate stock as of the selected period end. | Fixed locally |
| Analytics | Dashboard analytics now supports branch query params and scoped all-branch/all-store aggregation through allowed location IDs. | Fixed locally |
| Sales/POS API | Bills now enforce location scope on create/read/list/export/update/status/items. | Fixed locally |
| Purchase API | Purchase orders are still org-admin/super-admin only and have no `branchId`/`locationId` on create. Allocation checks destination location access, but branch/store-manager purchase creation is not implemented. | Partial |
| Inventory API | Search/list already required location filters for scoped users; low-stock/valuation now filter by assigned stores. | Fixed locally |
| Frontend selectors | Dashboard selector is branch-based; POS/Orders/Stock Movements still use store locations for operational workflows. | Fixed locally |

Conclusion: after the local patches, **store-level isolation is much stronger and branch managers are represented by `branch_id` assignments that expand to branch locations**. Sales, inventory, analytics, location, branch list, and black-stock reads/mutations are scoped through those locations. Remaining gap: purchase-order creation/ownership still needs an explicit branch/store ownership model.

## Frontend Module Wiring Audit

Compared local `core-apis/src/application/modules` controllers against `/api/v1/<module>` references in `ERP-Client/renderer/src`. This is module-level only; individual unused endpoints inside otherwise-used modules were intentionally ignored.

| Item | Result |
|---|---:|
| Backend controller modules detected | 42 |
| Modules referenced by ERP-Client | 41 |
| Backend modules with no ERP-Client reference | `mail` |

Backend modules wired at module level: `activity-logs`, `analytics`, `auth`, `billing-settings`, `bills`, `branches`, `categories`, `common-utility`, `credit-approvals`, `credit-transactions`, `customers`, `drivers`, `expenses`, `field-ops`, `inventory`, `invoices`, `item-returns`, `locations`, `maintenance`, `notifications`, `orders`, `organizations`, `payment-transactions`, `platform-configurations`, `product-logs`, `products`, `purchase-items`, `purchase-orders`, `report-generation-logs`, `roles`, `stock-movements`, `stock-transfer-requests`, `stock-transfers`, `suppliers`, `trips`, `unpublished-stock`, `user-roles`, `users`, `vehicle-expenses`, `vehicles`, `warehouse`.

Dead-code cleanup candidate at module level: `mail`. It exposes mail/testing/send functionality in the backend but has no ERP-Client callsite. Treat it as a cleanup candidate only after confirming it is not used by backend jobs, admin scripts, or external integrations.

Initial frontend paths absent from deployed Swagger:

| Frontend path | File |
|---|---|
| `/api/v1/inventory/by-product/:id` | Fixed locally to use `/api/v1/inventory?productId=...`: [features/inventory/api/index.ts](/home/parth/workspace-personal/ERP-Client/renderer/src/features/inventory/api/index.ts:41) |
| `/api/v1/users/directory` | Fixed locally to use `/api/v1/users` and map the response: [features/auth/api/index.ts](/home/parth/workspace-personal/ERP-Client/renderer/src/features/auth/api/index.ts:49), [api.ts](/home/parth/workspace-personal/ERP-Client/renderer/src/api.ts:550) |
| `/api/v1/customers/cust-1/statement/pdf` | test-only path in `statementPdf.test.ts`; ignore for runtime |

Current post-fix audit: no runtime frontend paths are absent from deployed Swagger. Only the test fixture URL remains.

## Auth And Onboarding Regression

| Flow | Result | Evidence |
|---|---:|---|
| `POST /api/v1/auth/login` with provided credentials | Pass | token returned and `/auth/me` resolved `org_admin` |
| Token lifetime during long regression | Warn | token expired mid-run with `401 Invalid or missing Clerk session token`; runner had to re-login |
| Renderer `/login` | Pass | email/password fields rendered |
| Renderer credential login | Warn | valid credentials routed to `/verify-second-factor`; cannot complete protected shell without emailed code |
| Renderer `/signup` | Pass | create-account form rendered |
| Renderer `/sso-continue` unauthenticated | Pass/Warn | redirected to login with expired Google sign-up message |
| Clerk production configuration | Fail | dev keys warning observed during renderer test |

Additional stuck-state audit:

| Potential stuck point | Risk found | Local fix |
|---|---|---|
| Initial auth boot | Could rely on Clerk listener callback to clear the boot screen after `clerk.load()` | `AuthProvider` now handles the current session immediately after load |
| `/verify-email` | Clerk load/session errors could leave `Preparing verification...` forever | Errors now render a recoverable back action |
| `/verify-second-factor` | Preparing email factor errors were swallowed or could leave the page preparing forever | Errors now render a recoverable back-to-login action |
| `/sso-continue` | Google continuation failures could leave `Preparing account...` forever | Errors now render a recoverable back-to-login action |
| `/onboarding/create-org` | Clerk org could be destroyed even after backend creation succeeded but refresh/navigation failed | Rollback only happens before backend creation succeeds |

## Checks Run

| Check | Result |
|---|---:|
| `core-apis npm test -- --runInBand` | Pass: 18 suites, 113 tests |
| `core-apis npm run build` | Pass after dependency install with `--legacy-peer-deps` |
| `ERP-Client npm test` | Pass: 11 files, 40 tests |
| `ERP-Client npm run build` | Pass after dependency install |
| `ERP-Client npm run pack` | Pass, produced `release/linux-unpacked` |
| Live API deep ERP regression | Fail: 4 functional analytics/accounting failures |
| Renderer auth/onboarding headless regression | Warn/Fail: MFA blocks full shell validation; dev Clerk config |
| Frontend/deployed Swagger wiring audit | Pass for runtime paths; `mail` remains an unwired backend/internal module |
| `core-apis npm audit --json` | Fail: 8 vulnerabilities |
| `ERP-Client npm audit --json` | Fail: 29 vulnerabilities |

## Notes

- `npm install` changed lockfiles during verification: `core-apis/package-lock.json`, `core-apis/yarn.lock`, and `ERP-Client/package-lock.json`.
- Operational stock accounting passed for the tested ERP path: purchase allocation adds stock, normal/credit sales remove official stock, black sales reduce unpublished stock only, and black-to-white conversion moves quantity into official inventory.
- Sales summary, revenue trend, top-products, inventory summary, and stock-by-location matched the isolated QA dataset.
- Purchase summary/trend and payment mix have local fixes and must be retested after deploying the patched backend.

## Post-Fix Verification

| Check | Result |
|---|---:|
| `core-apis npm test -- --runInBand` after fixes | Pass: 18 suites, 113 tests |
| `core-apis npm run build` after fixes | Pass |
| `ERP-Client npm test` after frontend wiring fixes | Pass: 11 files, 40 tests |
| `ERP-Client npm run build` after frontend wiring fixes | Pass when rerun outside sandbox; sandbox blocked `tsx` IPC pipe |
| `core-apis npm test -- --runInBand` after branch/timeline analytics filter fixes | Pass: 18 suites, 113 tests |
| `core-apis npm run build` after branch/timeline analytics filter fixes | Pass |
| `ERP-Client npm test` after branch dashboard filter fixes | Pass: 11 files, 40 tests |
| `ERP-Client npm run build` after branch dashboard filter fixes | Pass when rerun outside sandbox; sandbox blocked `tsx` IPC pipe |
| Frontend/deployed Swagger wiring audit after fixes | Pass for runtime paths; only test fixture `/customers/cust-1/statement/pdf` remains |
| Renderer auth/onboarding recheck after env/path fixes | Pass for `/signup`, `/sso-continue` redirect, `/login`; MFA still blocks protected shell validation |
| Renderer auth/onboarding recheck after stuck-state fixes | Pass for `/signup`, `/sso-continue` redirect, `/login`; MFA still blocks protected shell validation |
| Local backend module usage audit | Warn: `mail` is the only backend controller module with no ERP-Client reference |
| `core-apis npm test -- --runInBand` after report data fixes | Pass: 18 suites, 113 tests |
| `core-apis npm run build` after report data fixes | Pass |
| `ERP-Client npm test` after report type update | Pass: 11 files, 40 tests |
| `ERP-Client npm run build` after report type update | Pass when rerun outside sandbox; sandbox blocked `tsx` IPC pipe |

## Recommended Go/No-Go

**No-go until deploy retest.** Deploy the local fixes, rotate exposed credentials, provide production Clerk keys plus a QA account/code path that can complete MFA, reconcile local/deployed API drift for branches/auth-login, generate every report type from the deployed API, and rerun the live regression against the exact release API and packaged desktop artifact.
