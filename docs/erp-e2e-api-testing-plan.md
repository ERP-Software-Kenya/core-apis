# ERP End-to-End API Testing Plan

## Objective

Validate the ERP backend from authentication through purchasing, inventory, sales, returns, customer/supplier settlement, official accounting, isolated black-stock accounting, organization currency, and branch authorization.

This plan is intended for an autonomous testing agent. The agent must preserve evidence for every scenario: request, response status/body, relevant database rows before and after, and final pass/fail result.

## Mandatory safety rules

1. Run only against an isolated disposable test database and test Clerk tenant/users.
2. Never run mutation scenarios against production or a shared development database.
3. Apply the final approved migration before testing. Do not use TypeORM `synchronize`.
4. Use unique test prefixes such as `E2E-{runId}` for created records.
5. Do not test or change the intentionally excluded authentication behavior for a BranchManager with no branch association.
6. Do not mix black-stock ledger rows into official accounts, journals, trial balances, or reports.
7. Capture database state before cleanup. Cleanup only records created by the test run.

## Required environment

- Fresh PostgreSQL database with all approved migrations applied.
- Backend built from the candidate commit and started with `NODE_ENV=test`.
- API base URL, normally `http://127.0.0.1:<port>/api/v1`.
- Authentication tokens for:
  - SuperAdmin or OrgAdmin.
  - Branch 1 manager.
  - Branch 2 manager.
- SQL read access to the disposable database.
- A request runner supporting parallel calls, such as Node.js with `fetch`, Postman/Newman, or k6.

## Required fixtures

Create one organization with:

- Financial settings: `baseCurrencyCode=USD`, fiscal year starting in April, test time zone.
- Branch 1:
  - Warehouse A.
  - Store A.
- Branch 2:
  - Warehouse B.
- Branch 1 manager associated only with Branch 1 locations.
- Branch 2 manager associated only with Branch 2 locations.
- Two suppliers.
- Two normal customers and one credit customer.
- Products P1 and P2.
- Different branch prices for P1 in Branch 1 and Branch 2.
- Open official accounting period covering the test date.
- Default official and black-ledger accounts.

Record every generated ID in a run context object.

## Phase 1: health, authentication, settings, and currency

1. Call the health endpoint and require HTTP 200.
2. Call `GET /auth/me` for each user.
3. Assert organization, branch, locations, roles, and `currencyCode=USD`.
4. Call `GET /billing-settings/organization` and assert USD, April, and configured time zone.
5. Patch currency to another supported currency before financial journals exist; verify `/auth/me` and settings return the new code.
6. Generate a quotation, purchase-order PDF, bill PDF, order notification/email, expense notification, and financial report. Assert the configured currency is used and no hard-coded INR/₹ appears.
7. After posting an official journal, attempt to change currency or fiscal year. Require HTTP 409 and unchanged settings.
8. Verify all monetary JSON fields remain numeric; currency display metadata must come from organization settings or `/auth/me`.

## Phase 2: branch authorization and pricing

For every search, list, detail, update, PDF, transition, payment, allocation, return, and refund endpoint:

1. Create records in both branches as OrgAdmin.
2. Branch 1 manager must see and mutate only Branch 1 records.
3. Branch 2 manager must see and mutate only Branch 2 records.
4. Cross-branch IDs must return 403 or the application’s not-found equivalent without leaking record data.
5. Empty accessible-location scope must return zero list/search records.
6. OrgAdmin must retain organization-wide access.
7. Sell P1 in both branches and assert each bill/order/quotation uses that branch’s configured price.
8. Attempt allocation into another organization or branch location; require rejection and no stock/journal changes.

## Phase 3: official purchase lifecycle

1. Create a draft purchase order with multiple items.
2. Verify header, items, total, supplier, organization, and branch are committed together.
3. Submit invalid supplier/product IDs and duplicate products; require rejection with no partial rows.
4. Update draft notes/date and transition Draft → Ordered.
5. Reject invalid transitions and updates after leaving Draft.
6. Delete an unpaid draft and verify cascading item cleanup.
7. Reject deletion after ordering, receiving, allocating, or payment.
8. Receive P1 partially, receive another partial quantity, then complete receipt.
9. Reject zero, negative, duplicate-item, and over-receipt payloads.
10. Allocate received quantities across allowed locations.
11. Verify weighted average cost, quantity, movement, allocation, AP/advance journal, and branch/location dimensions.
12. Reject allocation above received quantity and outside the PO branch.
13. Record partial supplier payment, then final payment.
14. Reject overpayment and payments against Draft/Cancelled orders.
15. Verify Cash/Bank, Accounts Payable, and Supplier Advances balances.

## Phase 4: official purchase returns and supplier refunds

1. Create returns for allocated stock from exact source locations.
2. Finalize partial and full returns.
3. Assert inventory reduction, movement, return totals, AP reduction, and supplier credit.
4. Reject return quantities above allocated-minus-previously-returned quantity.
5. Record partial and final supplier refunds.
6. Reject refund above outstanding supplier credit.
7. Verify Cash/Bank debit and Supplier Advances credit.
8. Retry finalization and refund requests; ensure no duplicate stock or journals.

## Phase 5: black-stock purchase lifecycle

Repeat official purchase, partial receipt, allocation, payment, return, and supplier-refund scenarios using unpublished-stock endpoints.

Assert:

- Only `unpublished_stock*`, black purchase, black return/refund, and black-ledger tables change.
- Official inventory, journal entries, journal lines, AP, and official financial reports remain unchanged.
- Branch and location restrictions are identical to official stock.
- Black-stock overpayments, over-returns, and over-refunds are rejected.

## Phase 6: quotation and order lifecycle

1. Create quotation with multiple items and taxes.
2. Verify branch price resolution, totals, validity dates, and customer ownership.
3. Update only while editable; send quotation; revise it; verify parent/version linkage.
4. Convert quotation to order once. Retry conversion and require idempotent/rejected behavior without duplicate order.
5. Verify quotation PDF/email currency and escaped user-provided HTML.
6. Create direct sales order and verify item totals and branch pricing.
7. Verify invalid products/customers/locations from other organizations are rejected.

## Phase 7: inventory reservation and stock transfers

1. Reserve stock and verify `quantityReserved` without reducing on-hand.
2. Reject reservation above `onHand-reserved`.
3. Release reservation partially and fully; reject over-release.
4. Reject adjustment below reserved quantity.
5. Reject damage, write-off, removal, and transfer above available quantity.
6. Raise a stock request from Branch 1 Store A.
7. Accept from an authorized source location.
8. Verify source deduction, transfer creation, request acceptance, movement, and audit log commit atomically.
9. Claim at destination and verify destination addition, transfer completion, request completion, movement, and audit log atomically.
10. Reject self-acceptance, duplicate acceptance, duplicate claim, organization mismatch, and insufficient stock.
11. Verify failed operations leave all quantities and statuses unchanged.

## Phase 8: sales and billing

For normal, credit, and black sales:

1. Create a bill with multiple products and complete it.
2. Verify stock cost snapshots and exact quantity deductions.
3. Normal sale: require non-credit payment method and official Cash/Bank, Revenue, Tax, COGS, and Inventory journal lines.
4. Credit sale: require customer, CREDIT method, credit-limit enforcement, AR journal, customer balance, and credit transaction.
5. Black sale: require authorized role, unpublished stock only, black ledger only, and optional commission payable.
6. Reject normal/black completion without payment method and reject non-CREDIT method for credit sales.
7. Verify completed/cancelled bills are terminal and repeated completion is idempotent.
8. Cancel Initiated/Draft bills and assert no stock or journal mutation.
9. Test insufficient official and black stock; require transaction rollback.

## Phase 9: sales returns, refunds, and commissions

1. Return official sale items as restockable, damaged, and write-off where supported.
2. Verify quantity caps across multiple returns.
3. Verify sale revenue/tax reversal, inventory/COGS reversal using cost snapshots, and Cash/Bank or AR settlement.
4. For credit sale returns, verify customer balance and AR are reduced without becoming negative.
5. For black returns, verify only unpublished stock and black ledger change.
6. Verify black-sale commission reversal is proportional to returned value and cannot exceed original commission.
7. Retry finalization concurrently; only one stock and ledger effect may commit.

## Phase 10: customer and supplier balance reconciliation

1. Create a credit sale and record customer payments in parts.
2. Reject payment above customer outstanding balance.
3. Verify each customer transaction’s `balanceBefore` equals the previous row’s `balanceAfter`.
4. Verify final customer balance equals credit sales plus positive adjustments minus payments, negative adjustments, and credit-return reductions.
5. Verify AR journal balance by customer equals the customer balance.
6. For each supplier, reconcile allocated purchase value, returns, payments, and refunds against AP and Supplier Advances.
7. Repeat reconciliation independently for black-ledger supplier/customer dimensions.
8. Confirm official reconciliation queries never include black-ledger tables.

## Phase 11: concurrency tests

Use two or more simultaneous HTTP requests synchronized to start together.

Required races:

- Two receipts that together exceed ordered quantity.
- Two allocations that together exceed received quantity.
- Two payments that together exceed outstanding supplier/customer balance.
- Two bill completions against the same limited stock.
- Two return finalizations for the same quantity.
- Two supplier refunds above remaining credit.
- Two stock-request acceptances.
- Two stock-request claims.
- Parallel official journal posts with different idempotency keys.

For every race, require exactly the allowed number of successes, deterministic rejection of the rest, non-negative quantities, balanced ledgers, and no duplicate idempotency keys or entry numbers.

## Phase 12: rollback and idempotency

Induce a failure after validation but before transaction completion where possible, for example with invalid account configuration in the disposable database.

Verify rollback for:

- Purchase creation and item creation.
- Receipt/allocation and movements.
- Bill completion and stock/journal/customer balance.
- Return finalization.
- Transfer accept/claim.
- Supplier/customer payments and refunds.

Retry idempotent operations and verify one journal entry and one physical stock effect.

## Database reconciliation queries

The agent should implement parameterized SQL checks for:

- Every official journal entry: `SUM(debit)=SUM(credit)`.
- Every black-ledger entry: `SUM(debit)=SUM(credit)`.
- Unique `(organization_id,idempotency_key)` and `(organization_id,entry_number)`.
- Inventory and unpublished-stock quantities never negative.
- Official `quantity_reserved` between zero and `quantity_on_hand`.
- Purchase received ≤ ordered and allocated ≤ received.
- Return cumulative quantity ≤ eligible source quantity.
- Customer balance equals its transaction chain and AR dimension.
- Supplier AP/advance balances equal purchase/payment/return/refund history.
- No black source IDs/types in official journals and no official transactions in black-ledger tables.

## Automated response assertions

For every endpoint validate:

- Expected HTTP status.
- Response schema and numeric monetary fields.
- Organization/branch/location ownership.
- No secrets or cross-tenant identifiers in errors.
- Validation rejects missing, malformed, zero, negative, duplicate, oversized, or unsupported fields.
- Pagination counts match visible scoped rows.
- PDFs have correct content type, non-empty body, expected document number, and configured currency.

## Final release gates

The candidate passes only if all conditions are met:

1. Build, lint, unit, integration, and E2E suites pass.
2. No migration drift after applying the approved migration to a clean database.
3. All branch and organization isolation cases pass.
4. All concurrency races preserve stock and financial invariants.
5. Official and black ledgers remain completely isolated and balanced.
6. No customer/supplier overpayment or over-refund is accepted.
7. Currency is sourced exclusively from organization settings in APIs, documents, reports, emails, and notifications.
8. No critical/high security, correctness, accounting, or data-loss finding remains.

## Required test report format

For each scenario record:

- Scenario ID and name.
- User role and branch.
- Preconditions and fixture IDs.
- Request method, path, headers, and body with secrets redacted.
- Response status and relevant body.
- Database assertions before/after.
- Expected versus actual result.
- PASS/FAIL and defect reference.

Finish with totals by phase, failed scenario list, reconciliation summary, concurrency summary, environment/commit/migration identifiers, and an explicit `SAFE TO DEPLOY` or `NOT SAFE TO DEPLOY` verdict.
