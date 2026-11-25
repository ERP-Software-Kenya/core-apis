# Individual Account Mode — Design Spec

**Date:** 2026-11-26
**Status:** Approved for implementation

---

## 1. Problem

A solo shop owner signs up on mobile, lands on the `pending-role` screen, and is told to open the web client to create an organization. There is no path to complete onboarding entirely on mobile, and no first-class concept of an "individual" operator who does not need a team.

---

## 2. Decision

**Approach: Personal Organization**

When an individual signs up they automatically get a personal `Organization` row created for them — same table, same schema, same guards as a business org. One new column (`account_type`) distinguishes the two. All 90+ entities, repos, guards, and query handlers work unchanged.

This borrows the `EUserType` discriminator concept from `bit-core-apis/shared-base-lib` (where every identity carries `userType: individual_user | organization_user`) without adopting its multi-org role-map schema, which is designed for fintech compliance requirements that ERP does not have.

**What is NOT adopted from bit-core-apis:**
- Multi-org role map (`orgId` in composite PK of `EndUserRoleMapEntity`) — ERP is single-org-per-user
- `EmployeeLedgerEntity` time-series membership — ERP's `org_members` is sufficient
- Removing `organizationId` from `UserEntity` — ERP's entire data model scopes to an org

---

## 3. Constraints

- Individual account is permanent — no upgrade to business org
- Single-user only — invite command is blocked for individual orgs
- Multiple locations allowed — no location restrictions
- Mobile onboarding must complete fully in-app (no web redirect)

---

## 4. Data Model Change

### 4.1 `OrganizationEntity` — one new column

```
account_type  VARCHAR(20)  NOT NULL  DEFAULT 'business'
```

Allowed values: `'individual'` | `'business'`. Default `'business'` keeps all existing orgs unchanged.

**Migration:** generated via `npm run migration:generate` after adding the column to `OrganizationEntity`. Do not write manually.

### 4.2 `AuthenticatedUser` — one new field

```typescript
accountType: 'individual' | 'business' | undefined
```

Populated in `ClerkJwtStrategy.validate()` from the org record loaded during JWT validation. `undefined` when the user has no org yet (pending onboarding).

---

## 5. Backend — core-apis

### 5.1 Files to modify

| File | Change |
|---|---|
| `infrastructure/persistence/entities/organization.entity.ts` | Add `accountType: string` column (`varchar(20) NOT NULL DEFAULT 'business'`) |
| `application/modules/organizations/domain/organization.model.ts` | Add `accountType: string` property |
| `application/modules/organizations/models/responses/organization.response.ts` | Add `accountType: string` |
| `application/modules/organizations/mapper/organization.profile.ts` | Map `accountType` |
| `common/auth/types/authenticated-user.ts` | Add `accountType?: 'individual' \| 'business'` |
| `common/auth/strategies/clerk-jwt.strategy.ts` | After loading `dbUser`, if `dbUser.organizationId` is set, load the org record (can reuse the existing `orgMemberRepo` path) and set `authUser.accountType = org.accountType` |
| `application/modules/auth/models/responses/me.response.ts` | Add `accountType?: string` to `OrganizationSummary` |
| `application/modules/auth/queries/get-me/get-me.query-handler.ts` | Pass `org.accountType` through to `OrganizationSummary` |
| `application/modules/users/commands/invite-user/invite-user.command-handler.ts` | At the start of `execute()`, load the org by `command.organizationId` and throw `InviteRoleNotAllowedException` if `org.accountType === 'individual'` |
| `application/modules/auth/commands/index.ts` | Export new `OnboardIndividualCommandHandler` |
| `application/modules/auth/auth.controller.ts` | Add `POST /auth/individual` endpoint |
| `application/modules/auth/models/requests/index.ts` | Export `OnboardIndividualRequest` |
| `migrations/index.ts` | Add generated migration barrel entry |

### 5.2 Files to create

**`application/modules/auth/commands/onboard-individual/onboard-individual.command.ts`**

```typescript
export class OnboardIndividualCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
  @AutoMap() public dbUserId: string;
  @AutoMap() public shopName: string;        // becomes org.name + default location name
  @AutoMap() public country?: string;
  @AutoMap() public baseCurrencyCode?: string;
  @AutoMap() public timeZone?: string;
}
```

**`application/modules/auth/commands/onboard-individual/onboard-individual.command-handler.ts`**

Single-transaction sequence:
```
1. Reject if user already has organizationId
2. Create Organization { name: shopName, accountType: 'individual', country, isActive: true }
3. Resolve OrgAdmin role from roleRepo
4. UPDATE users SET organization_id = org.id WHERE id = dbUserId
5. INSERT org_members { organizationId: org.id, userId: dbUserId, roleId, status: 'active' }
6. INSERT locations { organizationId: org.id, name: shopName, type: 'store', isActive: true }
7. getOrCreateAsync org settings; apply baseCurrencyCode / timeZone if supplied
8. Return { organizationId, organizationName, membershipId, role }
```

All seven steps inside a single DB transaction. Roll back in reverse on any failure (same pattern as `OnboardOrganizationCommandHandler`).

**`application/modules/auth/commands/onboard-individual/index.ts`** — barrel export

**`application/modules/auth/models/requests/onboard-individual.request.ts`**

```typescript
export class OnboardIndividualRequest {
  @IsString() @MinLength(2) @MaxLength(255)
  public shopName: string;          // required

  @IsOptional() @IsString() @MaxLength(100)
  public country?: string;

  @IsOptional() @IsString() @Length(3, 3)
  public baseCurrencyCode?: string;

  @IsOptional() @IsString() @MaxLength(100)
  public timeZone?: string;
}
```

### 5.3 New endpoint

```
POST /api/v1/auth/individual
Guards: ClerkAuthGuard, @AllowPendingSession()
Request body: OnboardIndividualRequest
Response: OnboardOrganizationResponse (reuse same shape)
```

The controller method follows the same pattern as `onboardOrganization()` — sync the user first if no `dbUserId` exists, dispatch `OnboardIndividualCommand`, return the result.

### 5.4 `ClerkJwtStrategy` org-load strategy

The strategy already loads `userRoles`, `orgMembers`, and `managedBranch` in one `Promise.all`. Add the org to this batch:

```typescript
const [userRoles, orgMembers, managedBranch, org] = await Promise.all([
  this.userRoleRepo.find(...),
  this.orgMemberRepo.find(...),
  this.branchRepo.findOne(...),
  dbUser.organizationId
    ? this.orgRepo.findOne({ where: { id: dbUser.organizationId }, select: ['id', 'accountType'] })
    : Promise.resolve(null),
]);
authUser.accountType = (org?.accountType as 'individual' | 'business') ?? undefined;
```

This requires injecting `OrganizationEntity` repository into `ClerkJwtStrategy` (same pattern as `UserEntity`, `UserRoleEntity` already injected there).

### 5.5 Migration

After all entity changes:
```
npm run migration:generate
```

One DDL operation:
```sql
ALTER TABLE core.organizations ADD COLUMN account_type VARCHAR(20) NOT NULL DEFAULT 'business';
```

Add the generated file to `migrations/index.ts` barrel and run `migration:up`.

---

## 6. Mobile — erp-app

### 6.1 New screens

**`app/(auth)/account-type.tsx`**

Shown after sign-up email verification, before the existing `pending-role` check. Two cards:

- **Just me** — "I run my own shop solo"
- **Team / Business** — "I manage a team or business"

Tapping "Just me" navigates to `onboard-individual`. Tapping "Team / Business" navigates to `pending-role` (existing path unchanged).

Routing trigger: root layout detects `isOnboarded = false` AND no `accountType` in auth store → show `account-type` screen.

**`app/(auth)/onboard-individual.tsx`**

Form fields:
- Shop name (required)
- Country (required, dropdown)
- Currency (optional, defaults to KES)
- Time zone (optional, auto-detected)

On submit: `POST /api/v1/auth/individual` → on success, set `accountType = 'individual'` in auth store, navigate to `/(individual)/` dashboard.

### 6.2 New route group

**`app/(individual)/`** — mirrors `(org-admin)/` file structure exactly. Thin wrappers pointing to the same shared screens in `src/screens/manager/`. Add layout file:

**`app/(individual)/_layout.tsx`**

Same tabs as org-admin layout: Home · Sales · Purchase · Inventory · More. Only `MoreScreen` differs (see §6.3).

### 6.3 `src/screens/manager/MoreScreen.tsx`

Add a conditional block:

```typescript
const { accountType } = useAuthStore();
// Hide user management nav row when individual
{accountType !== 'individual' && (
  <MoreNavRow label="Users & Roles" icon="people" onPress={...} />
)}
```

No other screen changes — all operational modules (Sales, Purchase, Inventory, Customers, Suppliers) work identically for individual and business accounts because the backend scopes by `organizationId` regardless of `accountType`.

### 6.4 `src/store/auth.store.ts`

Add field:
```typescript
accountType: 'individual' | 'business' | null;
```

Populated from `GET /auth/me` response (`me.organization.accountType`). Set to `null` on sign-out.

### 6.5 `src/api/auth.api.ts`

Add:
```typescript
export async function onboardIndividualApi(data: OnboardIndividualRequest): Promise<OnboardOrganizationResponse> {
  return apiClient.post('/v1/auth/individual', data);
}
```

### 6.6 Root layout bootstrap update (`app/_layout.tsx`)

Current flow:
```
synced? → no role → pending-role
```

Updated flow:
```
synced? → no role → accountType chosen? → no → account-type screen
                                        → individual → onboard-individual screen
                                        → business   → pending-role (unchanged)
        → has role → org-admin or branch-manager dashboard (unchanged)
        → individual org → (individual) dashboard
```

The `accountType` choice is stored in `auth.store` (persisted via SecureStore) so the user is not re-asked on app restart mid-onboarding.

---

## 7. ERP-Client (web)

### 7.1 Auth types

Add `accountType?: 'individual' | 'business'` to the `OrganizationSummary` interface (wherever `MeResponse` is typed, typically `services/auth.service.ts` or `types.ts`).

### 7.2 Sidebar navigation

Wherever the "Users" page link is rendered in the sidebar, add:

```typescript
{org?.accountType !== 'individual' && <SidebarLink href="/users" label="Users" />}
```

### 7.3 Invite drawer

Hide the "Invite User" button/drawer for individual orgs. The backend rejects the call anyway (`InviteRoleNotAllowedException`), but hiding it avoids a confusing error.

---

## 8. Access Control Summary

| Action | Individual account | Business account |
|---|---|---|
| All ERP operations (buy, sell, inventory, customers, suppliers) | Yes | Yes |
| Multiple locations | Yes | Yes |
| Invite team members | Blocked (backend throws + UI hidden) | Yes |
| User & Roles page | Hidden | Visible |
| Org switcher | N/A (always single-org) | Visible (if multi-org) |

---

## 9. File Change Summary

### core-apis

| File | Action |
|---|---|
| `entities/organization.entity.ts` | Modify |
| `organizations/domain/organization.model.ts` | Modify |
| `organizations/models/responses/organization.response.ts` | Modify |
| `organizations/mapper/organization.profile.ts` | Modify |
| `common/auth/types/authenticated-user.ts` | Modify |
| `common/auth/strategies/clerk-jwt.strategy.ts` | Modify |
| `auth/models/responses/me.response.ts` | Modify |
| `auth/queries/get-me/get-me.query-handler.ts` | Modify |
| `users/commands/invite-user/invite-user.command-handler.ts` | Modify |
| `auth/auth.controller.ts` | Modify |
| `auth/models/requests/index.ts` | Modify |
| `auth/commands/index.ts` | Modify |
| `auth/commands/onboard-individual/onboard-individual.command.ts` | Create |
| `auth/commands/onboard-individual/onboard-individual.command-handler.ts` | Create |
| `auth/commands/onboard-individual/index.ts` | Create |
| `auth/models/requests/onboard-individual.request.ts` | Create |
| `migrations/<timestamp>-add-org-account-type.ts` | Generated |
| `migrations/index.ts` | Modify (barrel) |

### erp-app (mobile)

| File | Action |
|---|---|
| `app/(auth)/account-type.tsx` | Create |
| `app/(auth)/onboard-individual.tsx` | Create |
| `app/(individual)/_layout.tsx` | Create |
| `app/(individual)/*.tsx` | Create (thin wrappers, mirrors org-admin) |
| `src/store/auth.store.ts` | Modify |
| `src/api/auth.api.ts` | Modify |
| `src/screens/manager/MoreScreen.tsx` | Modify |
| `app/_layout.tsx` | Modify |

### ERP-Client (web)

| File | Action |
|---|---|
| Auth types file (MeResponse / OrganizationSummary) | Modify |
| Sidebar navigation component | Modify |
| Invite User drawer | Modify |

---

## 10. Out of Scope

- Upgrade path from individual to business org
- Multi-user individual accounts
- Individual-specific pricing or feature limits
- Separate onboarding analytics/tracking per account type
