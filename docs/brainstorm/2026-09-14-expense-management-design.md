# Expense Management — Production-Grade Redesign

**Date:** 2026-09-14
**Scope:** `core-apis` backend + `ERP-Client` frontend

---

## 1. Goals

- Any authenticated org member can submit an expense claim against their organisation.
- Org admins can move claims through a 4-step lifecycle and complete (settle) them.
- All identity fields are sourced from the authenticated Clerk session — no manual entry.
- Members see only their own submissions; admins see all org submissions.
- Push notifications keep both sides informed at every transition.
- Receipts can be attached at submission time.

---

## 2. Status State Machine

```
PENDING  ──▶  UNDER_REVIEW  ──▶  APPROVED  ──▶  SETTLED
PENDING  ──▶  REJECTED                    (comment required)
UNDER_REVIEW  ──▶  REJECTED              (comment required)
```

All other transitions return `400 Bad Request`. Transition guard lives in `UpdateExpenseStatusCommandHandler`.

---

## 3. Roles & Access

| Role | GET /expenses/list | PATCH status | POST (submit) |
|---|---|---|---|
| OrgAdmin / SuperAdmin | All org expenses | Yes | Yes |
| Any other role (member) | Own expenses only (`submitted_by_user_id = caller`) | No | Yes |

---

## 4. Database — `core.expenses` Schema Changes

Run `npm run migration:generate` after entity changes. Never write migrations by hand.

### New columns

| Column | Type | Nullable | Notes |
|---|---|---|---|
| `submitted_by_user_id` | `varchar(255)` | NOT NULL | Clerk user ID, injected from JWT in controller |
| `submitted_by_name` | `varchar(255)` | nullable | Display name from JWT |
| `receipt_key` | `text` | nullable | R2 object key; populated by upload endpoint |
| `admin_comment` | `text` | nullable | Required by service on UNDER_REVIEW + REJECTED transitions; nullable at DB level |

### Changed columns

| Column | Change |
|---|---|
| `status` | Extended to accept `under_review` and `settled` in addition to existing `pending`, `approved`, `rejected` |

### Kept but unused

| Column | Reason |
|---|---|
| `submitted_by` | Kept for backward compat with existing data; no longer written or read by new code |

---

## 5. Backend Changes (core-apis)

### 5.1 New file — `ExpenseReceiptStorage`

`src/application/modules/expenses/storage/expense-receipt.storage.ts`

Extends `R2FileStorage` — mirrors `LocationImageStorage` exactly. R2 object key pattern:

```
expenses/{expenseId}/receipt/{timestamp}
```

Registered as a provider in `ExpensesModule`.

### 5.2 New command — `UploadExpenseReceiptCommand`

`src/application/modules/expenses/commands/upload-expense-receipt/`

Files: `.command.ts`, `.command-handler.ts`, `index.ts`

Handler:
1. Fetches expense by `expenseId`; throws `NotFoundException` if absent.
2. Asserts caller is the submitter or an admin.
3. If `expense.receiptKey` already exists, removes old object from R2.
4. Writes new file via `ExpenseReceiptStorage.writeAsync(key, buffer, mimeType)`.
5. Sets `expense.receiptKey = storedKey` and calls `repo.updateAsync(expense)`.
6. Returns updated `ExpenseResponse`.

### 5.3 Updated command — `CreateExpenseCommandHandler`

Changes:
- Remove `submittedBy` and `organizationId` from `CreateExpenseRequest` DTO — both are auto-set from JWT and must not come from the client.
- Add `submittedByUserId: string` (NOT NULL) and `submittedByName?: string` to `CreateExpenseCommand` and domain model.
- Controller sets all three fields from JWT before dispatching: `command.organizationId = requireOrganizationId(user)`, `command.submittedByUserId = user.id`, `command.submittedByName = user.fullName`.
- After `repo.createAsync`: dispatch `ListUserRolesQuery` for the org, filter results where `userRole.roleId === ERole.OrgAdmin`, then dispatch one `CreateNotificationCommand` per admin `userId`:
  - `type: 'expense.submitted'`
  - `title: 'New Expense Claim'`
  - `body: '{submittedByName} submitted ₹{amount} for {category}'`
  - `data: { expenseId }`

### 5.4 Updated command — `UpdateExpenseStatusCommandHandler`

Changes:
- `UpdateExpenseStatusRequest` adds `comment?: string`.
- Handler validates transition is legal (see §2); throws `BadRequestException` on illegal move.
- Handler enforces comment is present when `status === 'under_review' || status === 'rejected'`; throws `BadRequestException` if absent.
- Sets `expense.adminComment = command.comment` (only on legal transitions that carry a comment).
- After `repo.updateAsync`: dispatches `CreateNotificationCommand` for `expense.submittedByUserId`:
  - `type: 'expense.status_changed'`
  - `title` and `body` vary by new status (e.g. "Your expense was approved", "Your expense needs review").
  - `data: { expenseId, status, comment }`

### 5.5 Updated query — `ListExpensesQueryHandler`

- Replace `repo.allAsync()` + in-memory filter with a DB-level query that accepts `organizationId`, optional `status`, and optional `submittedByUserId`.
- Controller derives `submittedByUserId` filter: if caller role is `OrgAdmin` or `SuperAdmin`, pass `undefined` (no user filter); otherwise pass `user.id`.
- `IExpenseRepo` gains `listAsync(filter: ExpenseFilter): Promise<Expense[]>` where `ExpenseFilter` adds `submittedByUserId?: string` alongside the existing `status` field.

### 5.6 Updated query — `GetExpenseQueryHandler`

- After fetching by ID, if caller is not an admin, assert `expense.submittedByUserId === user.id`; throw `ForbiddenException` otherwise.

### 5.7 Controller — new endpoint

```
POST /v1/expenses/:id/receipt
```

- Guard: `ClerkAuthGuard`.
- Decorator: `@UseInterceptors(FileInterceptor('receipt'))` — NestJS multipart.
- Dispatches `UploadExpenseReceiptCommand`.
- Returns `ExpenseResponse`.

### 5.8 Domain model & entity updates

`expense.model.ts` — add: `submittedByUserId`, `submittedByName`, `receiptKey`, `adminComment`.

`expense.entity.ts` — add corresponding `@Column()` decorators matching §4.

`EExpenseStatus` enum — add `UnderReview = 'under_review'` and `Settled = 'settled'`.

`expense.profile.ts` — add `@AutoMap()` mappings for all new fields.

---

## 6. Frontend Changes (ERP-Client)

### 6.1 `types.ts` — `Expense` interface

Add: `submittedByUserId`, `submittedByName`, `receiptKey`, `adminComment`.

`EExpenseStatus` — add `'under_review'` and `'settled'`.

### 6.2 `api.ts` — `ExpensesApi`

- `useList(status?)` — no change needed; API now filters by user server-side.
- `useUpdateStatus(id, status, comment)` — add `comment` to request body.
- Add `useUploadReceipt(id, file): void` — `POST /api/v1/expenses/:id/receipt` via `FormData`.

### 6.3 `pages/Expenses/index.tsx` — full update

**Create form:**
- Remove `submittedBy` text input and `organisationId` `ResourceSelect`.
- Add read-only info block at top showing Organisation name and Submitted By name (sourced from current user context).
- Add receipt file input (`<input type="file" accept="image/*,.pdf">`); on submit, if file present, call `useUploadReceipt` after the expense is created.

**Table:**
- Add status badges for `under_review` (blue) and `settled` (purple).
- Admin Actions column — render buttons based on current status:
  - `pending` → **Review** + **Reject**
  - `under_review` → **Approve** + **Reject**
  - `approved` → **Mark Settled**
  - `settled` / `rejected` → no actions
- Member view: Actions column hidden entirely; table shows only the member's own rows (server-filtered).

**Comment dialog:**
- Shared `ConfirmDialog` extended with a required `<textarea>` for comment.
- Submit button disabled until comment is non-empty.
- Used for: Move to Review, Reject (from pending), Reject (from under_review).

**Status filter dropdown:**
- Extend options to include `under_review` and `settled`.

### 6.4 Notification display

No new work required — the existing Centrifuge client already receives and displays notifications pushed to `user_{id}` channels. New notification types `expense.submitted` and `expense.status_changed` will appear in the existing notification bell automatically.

---

## 7. Notification Message Copy

| Event | Recipient | Title | Body |
|---|---|---|---|
| Expense submitted | Each org admin | New Expense Claim | `{name} submitted ₹{amount} for {category}` |
| Moved to Under Review | Submitter | Expense Under Review | `Your ₹{amount} {category} claim needs more information` |
| Approved | Submitter | Expense Approved | `Your ₹{amount} {category} claim has been approved` |
| Rejected | Submitter | Expense Rejected | `Your ₹{amount} {category} claim was rejected: {comment}` |
| Settled | Submitter | Expense Settled | `Your ₹{amount} {category} claim has been settled` |

---

## 8. Implementation Order

1. Entity + enum changes → generate migration → apply.
2. `ExpenseReceiptStorage` + `UploadExpenseReceiptCommand`.
3. `CreateExpenseCommandHandler` — identity injection + admin notification.
4. `UpdateExpenseStatusCommandHandler` — transition guard + comment + submitter notification.
5. `ListExpensesQueryHandler` — DB-level filter.
6. `GetExpenseQueryHandler` — member ownership check.
7. Controller — wire new receipt endpoint, update list/status routes.
8. ERP-Client — types, api.ts, Expenses page (form + table + dialog + badges).

---

## 9. Out of Scope

- Edit of a submitted expense (no `PATCH /expenses/:id` general update — the DTO exists but is not wired and remains unwired).
- Fleet / vehicle expenses — separate module, not part of this redesign.
- Receipt URL pre-signing for download — `receiptKey` is stored; a future endpoint can generate a signed URL.
- Pagination — the existing unpaginated response shape is kept; a pagination pass is a separate task.
