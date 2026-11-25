# Individual Account Mode — Design Spec

**Date:** 2026-11-26  
**Status:** Approved for implementation  
**Supersedes:** earlier draft of same date

---

## 1. Problem

A solo shop owner signs up on mobile and hits a dead end: the `pending-role` screen tells them to open the web client to create an organization. There is no path to complete onboarding entirely on mobile, no first-class individual account concept, and no way for a user to later join a business org and switch between contexts.

---

## 2. Production Reference

**Odoo** is company-centric: every `res.users` record has `company_id` (active company) and `company_ids` (all accessible companies). Every data record is scoped by `company_id`. Context switching updates `company_id` via a session RPC call. Invited users are scoped to the inviting company from creation — no personal company.

**What we adopt from Odoo:**
- Two-phase onboarding: sign up → then activate (collect company data)
- Every data record scoped to one org (`organizationId` already in place)
- Context switching changes which org scopes all subsequent queries

**Where we differ (GitHub/Notion model instead):**
- Every user gets a personal org automatically on activation — not just business users
- Invited users keep their personal org; the business org is additive
- Context switching is per-request header (not server-side session) — better for dual mobile+web clients

---

## 3. User Flows

### 3.1 Pure individual (new user, no invite)

```
Sign up (Clerk) 
  → POST /auth/sync  [creates DB user, no org yet]
  → Account Setup screen [shopName, country, currency, timezone]
  → POST /auth/activate  [creates personal org + default location]
  → Individual dashboard
```

### 3.2 Invited to a business org (new user)

```
Admin sends invite (existing InviteUserCommand)
  → User receives email, signs up via invite link
  → POST /auth/sync → applyInvite() runs → OrgMemberEntity created for business org
  → Account Setup screen [still required — creates personal org too]
  → POST /auth/activate  [creates personal org + default location]
  → Individual dashboard (default context = personal org)
  → Profile switcher shows: My Account + [Business Org Name]
```

### 3.3 Existing individual user gets invited

```
Admin sends invite to user who already has personal org
  → User clicks invite link, signs in
  → POST /auth/sync → applyInvite() runs → OrgMemberEntity created for business org
  → Switcher in profile now shows: My Account + [Business Org Name]
```

### 3.4 Context switch

```
User taps org in profile switcher
  → auth store updates activeOrgId
  → all subsequent API calls include header: X-Active-Org: <orgId>
  → ClerkJwtStrategy reads header → validates membership → sets authUser.organizationId
  → all ERP operations run under that org's data
```

---

## 4. Data Model Changes

### 4.1 `OrganizationEntity` — one new column

```
account_type  VARCHAR(20)  NOT NULL  DEFAULT 'business'
```

Values: `'individual'` | `'business'`. Default `'business'` keeps all existing orgs unchanged.

### 4.2 `AuthenticatedUser` — two new fields

```typescript
accountType?: 'individual' | 'business'   // from org record
activeOrgId?: string                       // from X-Active-Org header (validated)
```

### 4.3 No changes to `UserEntity`

`user.organizationId` continues to point to the personal org after activation. Business org memberships live exclusively in `OrgMemberEntity`. No new columns on `users`.

### 4.4 Migration

Generated via `npm run migration:generate` after entity change. One DDL operation:
```sql
ALTER TABLE core.organizations
  ADD COLUMN account_type VARCHAR(20) NOT NULL DEFAULT 'business';
```

---

## 5. Backend — core-apis

### 5.1 Files to modify

| File | Change |
|---|---|
| `entities/organization.entity.ts` | Add `accountType: string` column (`varchar(20) NOT NULL DEFAULT 'business'`) with `@AutoMap()` |
| `organizations/domain/organization.model.ts` | Add `accountType: string` |
| `organizations/models/responses/organization.response.ts` | Add `accountType: string` |
| `organizations/mapper/organization.profile.ts` | Map `accountType` |
| `common/auth/types/authenticated-user.ts` | Add `accountType?: 'individual' \| 'business'` and `activeOrgId?: string` |
| `common/auth/strategies/clerk-jwt.strategy.ts` | See §5.4 |
| `auth/models/responses/me.response.ts` | Add `accountType` to `OrganizationSummary`; add `memberships: OrgMembershipSummary[]` to `MeResponse` |
| `auth/queries/get-me/get-me.query-handler.ts` | Load all `OrgMemberEntity` rows for user; return as `memberships[]` |
| `users/commands/invite-user/invite-user.command-handler.ts` | Remove individual-org block — individual users CAN be invited to business orgs |
| `auth/commands/sync-user/sync-user.command-handler.ts` | See §5.5 — fix `applyInvite()` early return |
| `auth/auth.controller.ts` | Add `POST /auth/activate` endpoint; rename existing onboard-individual references |
| `auth/models/requests/index.ts` | Export `ActivateAccountRequest` |
| `auth/commands/index.ts` | Export `ActivateAccountCommandHandler` |
| `migrations/index.ts` | Add generated migration |

### 5.2 New files to create

**`auth/commands/activate-account/activate-account.command.ts`**
```typescript
export class ActivateAccountCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
  @AutoMap() public dbUserId: string;
  @AutoMap() public shopName: string;
  @AutoMap() public country?: string;
  @AutoMap() public baseCurrencyCode?: string;
  @AutoMap() public timeZone?: string;
}
```

**`auth/commands/activate-account/activate-account.command-handler.ts`**

Single-transaction sequence:
```
1. Load user. Throw if user already has organizationId (already activated).
2. INSERT organizations { name: shopName, accountType: 'individual', country, isActive: true }
3. Resolve OrgAdmin role.
4. UPDATE users SET organization_id = org.id WHERE id = dbUserId
5. INSERT org_members { organizationId: org.id, userId, roleId, status: 'active' }
6. INSERT locations { organizationId: org.id, name: shopName, type: 'store', isActive: true }
7. getOrCreateAsync org settings; apply baseCurrencyCode / timeZone if supplied.
8. Return { organizationId, organizationName, membershipId, role }
```

All steps inside one DB transaction. Rollback in reverse on failure (same pattern as `OnboardOrganizationCommandHandler`).

**`auth/commands/activate-account/index.ts`** — barrel export

**`auth/models/requests/activate-account.request.ts`**
```typescript
export class ActivateAccountRequest {
  @IsString() @MinLength(2) @MaxLength(255)
  public shopName: string;          // required — becomes personal org name + default location name

  @IsOptional() @IsString() @MaxLength(100)
  public country?: string;

  @IsOptional() @IsString() @Length(3, 3)
  public baseCurrencyCode?: string; // e.g. 'KES'

  @IsOptional() @IsString() @MaxLength(100)
  public timeZone?: string;         // e.g. 'Africa/Nairobi'
}
```

**`auth/models/responses/me.response.ts` additions**

New class for org switcher:
```typescript
export class OrgMembershipSummary {
  @ApiProperty() public organizationId: string;
  @ApiProperty() public organizationName: string;
  @ApiProperty() public accountType: string;    // 'individual' | 'business'
  @ApiProperty() public role: string;
  @ApiPropertyOptional() public logoUrl?: string;
}
```

Add to `MeResponse`:
```typescript
@ApiProperty({ type: [OrgMembershipSummary] })
public memberships: OrgMembershipSummary[];
```

### 5.3 New endpoint

```
POST /api/v1/auth/activate
Guards: ClerkAuthGuard, @AllowPendingSession()
Request: ActivateAccountRequest
Response: OnboardOrganizationResponse (reuse existing shape)
```

Controller method: sync user if needed, dispatch `ActivateAccountCommand`, return result. Identical pattern to existing `onboardOrganization()`.

### 5.4 `ClerkJwtStrategy` changes

Two changes:

**A — Add `passReqToCallback: true` to strategy config:**
```typescript
super({
  secretOrKeyProvider: ...,
  jwtFromRequest: ...,
  passReqToCallback: true,   // ← add this
  ...
});
```

Signature becomes `validate(req: Request, payload: ClerkJwtPayload)`.

**B — Read `X-Active-Org` header and load org:**

After building `authUser.roles`, `authUser.locationIds`, etc.:

```typescript
// Load personal org accountType
const org = dbUser.organizationId
  ? await this.orgRepo.findOne({
      where: { id: dbUser.organizationId },
      select: ['id', 'accountType'],
    })
  : null;
authUser.accountType = org?.accountType as 'individual' | 'business' | undefined;

// Honor X-Active-Org header for context switching
const requestedOrgId = req.headers['x-active-org'] as string | undefined;
if (requestedOrgId && requestedOrgId !== dbUser.organizationId) {
  const membership = await this.orgMemberRepo.findOne({
    where: { userId: dbUser.id, organizationId: requestedOrgId, status: 'active' },
  });
  if (membership) {
    // User is a valid member of the requested org — switch context
    authUser.organizationId = requestedOrgId;
    authUser.activeOrgId = requestedOrgId;
    // Reload roles and location access for the switched org
    const switchedOrgRoles = userRoles
      .filter(ur => !ur.locationId)   // org-wide roles only for now
      .map(ur => ur.role?.name)
      .filter(Boolean);
    const switchedOrgMemberRoles = orgMembers
      .filter(om => om.organizationId === requestedOrgId)
      .map(om => om.role?.name)
      .filter(Boolean);
    authUser.roles = [...new Set([...switchedOrgRoles, ...switchedOrgMemberRoles])];
    authUser.hasOrgWideAccess = authUser.roles.some(r =>
      r === ERole.SuperAdmin || r === ERole.OrgAdmin);
    authUser.locationIds = [];   // org-wide by default after switch; location guard still applies
  }
  // If membership not found, silently ignore the header — fall back to personal org
}
```

Inject `OrganizationEntity` repository into `ClerkJwtStrategy` constructor (same pattern as `UserEntity` already there). Batch the org load in the existing `Promise.all`.

### 5.5 `SyncUserCommandHandler.applyInvite()` fix

Current code returns early if user already has `organizationId`:
```typescript
if (!locked || locked.organizationId) return;
```

**Change:** Always create `OrgMemberEntity` for the invited org, even if user already has a personal org. Only skip the `user.organizationId` update if already set:

```typescript
// Only link primary org if not already set
if (!locked.organizationId) {
  locked.organizationId = organizationId;
  await manager.save(UserEntity, locked);
}

// Always create role and membership for the invited org
const existingRole = await manager.findOne(UserRoleEntity, { where: { userId } });
if (!existingRole) {
  await manager.save(UserRoleEntity, manager.create(UserRoleEntity, { userId, roleId, locationId }));
}
const existingMember = await manager.findOne(OrgMemberEntity, { where: { userId, organizationId } });
if (!existingMember) {
  await manager.save(OrgMemberEntity, manager.create(OrgMemberEntity, {
    organizationId, userId, roleId, status: 'active', joinedAt: new Date(),
  }));
}
```

### 5.6 `GetMeQueryHandler` changes

Load all active `OrgMemberEntity` rows for the user. For each, load the org name and accountType. Return as `memberships[]`. This is what the client uses to build the context switcher.

---

## 6. Mobile — erp-app

### 6.1 New screens

**`app/(auth)/activate.tsx`** — Account Setup (replaces old `onboard-individual.tsx`)

Shown to any user who has completed Clerk sign-up but has not yet activated (no `organizationId` on their DB user). Fields:
- Shop / business name (required) — used as personal org name
- Country (required, dropdown)
- Currency (optional, defaults to KES)
- Time zone (optional, auto-detected from device)

On submit: `POST /api/v1/auth/activate` → store `accountType = 'individual'` + `activeOrgId = personalOrgId` → navigate to `/(individual)/` dashboard.

This screen is shown for ALL new users — both purely individual sign-ups and users who signed up via an org invite. The invite is processed on `POST /auth/sync`; the personal org is created separately here.

**No account-type selection screen** — every user starts as individual. Business org context is additive via the switcher.

### 6.2 Route groups

**`app/(individual)/`** — personal org context. Same tabs as `(org-admin)/`:
```
Home | Sales | Purchase | Inventory | More
```
Thin wrappers pointing to the same shared screens in `src/screens/manager/`.

**`app/(org-admin)/`** and **`app/(branch-manager)/`** — existing, unchanged. Used when switched to a business org context.

### 6.3 `src/store/auth.store.ts`

Add fields:
```typescript
accountType: 'individual' | 'business' | null;
activeOrgId: string | null;                        // currently active org
memberships: OrgMembershipSummary[];               // all orgs from GET /auth/me
```

`activeOrgId` is persisted via SecureStore so it survives app restarts. On first activation it is set to the personal org id.

### 6.4 API client — `X-Active-Org` header

In the Axios/fetch interceptor (wherever the `Authorization` header is set), add:

```typescript
if (authStore.activeOrgId) {
  config.headers['X-Active-Org'] = authStore.activeOrgId;
}
```

This applies to every authenticated request. When `activeOrgId` equals the personal org id, all data returned is the user's personal org data. When switched to a business org, all data is scoped to that org.

### 6.5 `src/screens/manager/MoreScreen.tsx` — Org Switcher

Add an "Accounts" section above Sign Out:

```
┌─────────────────────────────────────┐
│  My Account          ✓ active       │  ← personal org (always shown)
│  Acme Distributors                  │  ← business org (shown if member)
│  + Join or create org               │  ← links to invite acceptance / web onboarding
└─────────────────────────────────────┘
```

Tapping a row:
1. `authStore.setActiveOrgId(org.id)`
2. Navigate to the appropriate route group: `/(individual)/` for personal, `/(org-admin)/` for business OrgAdmin, `/(branch-manager)/` for business BranchManager
3. All screens refetch because `activeOrgId` changed and the `X-Active-Org` header updates

Hide "Users & Roles" row when `activeOrg.accountType === 'individual'`.

### 6.6 Root layout bootstrap (`app/_layout.tsx`)

Updated routing decision tree:
```
Clerk session? No  → login
             Yes
               ↓
           POST /auth/sync
               ↓
           isOnboarded? No  → activate screen
                        Yes
                          ↓
                      activeOrgId set? No  → set to personal org
                                       Yes
                                         ↓
                                     route to correct group
                                     (individual / org-admin / branch-manager)
```

### 6.7 New API function — `src/api/auth.api.ts`

```typescript
export async function activateAccountApi(data: ActivateAccountRequest): Promise<OnboardOrganizationResponse> {
  return apiClient.post('/v1/auth/activate', data);
}
```

---

## 7. ERP-Client (web)

### 7.1 Auth types

Add to `OrganizationSummary`:
```typescript
accountType: 'individual' | 'business';
```

Add `memberships: OrgMembershipSummary[]` to `MeResponse`.

### 7.2 API client — `X-Active-Org` header

In the Axios interceptor (wherever `Authorization` is set), add:
```typescript
const activeOrgId = authContext.activeOrgId;
if (activeOrgId) {
  config.headers['X-Active-Org'] = activeOrgId;
}
```

### 7.3 Org switcher in header / profile dropdown

Show all memberships from `GET /auth/me`. Clicking switches `activeOrgId` in auth context, triggering a full page data reload.

### 7.4 Navigation guards

Hide "Users" page link when `activeOrg.accountType === 'individual'`. Hide "Invite User" drawer for the same condition. Backend rejects the call anyway, but hiding it avoids a confusing error.

---

## 8. Access Control Summary

| Action | Individual context | Business org context |
|---|---|---|
| All ERP ops (buy, sell, inventory, customers, suppliers) | Yes | Yes |
| Multiple locations | Yes | Yes |
| Invite team members | Blocked (backend + UI hidden) | Yes |
| Users & Roles page | Hidden | Visible |
| Org switcher | Shown when user has ≥1 business org membership | Always shown |
| `X-Active-Org` header accepted for personal org | Yes (no-op, already default) | Yes — switches context |

---

## 9. File Change Summary

### core-apis

| File | Action |
|---|---|
| `entities/organization.entity.ts` | Modify — add `accountType` column |
| `organizations/domain/organization.model.ts` | Modify |
| `organizations/models/responses/organization.response.ts` | Modify |
| `organizations/mapper/organization.profile.ts` | Modify |
| `common/auth/types/authenticated-user.ts` | Modify — add `accountType`, `activeOrgId` |
| `common/auth/strategies/clerk-jwt.strategy.ts` | Modify — `passReqToCallback`, org load, header read |
| `auth/models/responses/me.response.ts` | Modify — add `OrgMembershipSummary`, `memberships[]` |
| `auth/queries/get-me/get-me.query-handler.ts` | Modify — load all memberships |
| `auth/commands/sync-user/sync-user.command-handler.ts` | Modify — fix `applyInvite()` early return |
| `users/commands/invite-user/invite-user.command-handler.ts` | Modify — remove individual-org block |
| `auth/auth.controller.ts` | Modify — add `POST /auth/activate` |
| `auth/models/requests/index.ts` | Modify — export `ActivateAccountRequest` |
| `auth/commands/index.ts` | Modify — export `ActivateAccountCommandHandler` |
| `auth/commands/activate-account/activate-account.command.ts` | Create |
| `auth/commands/activate-account/activate-account.command-handler.ts` | Create |
| `auth/commands/activate-account/index.ts` | Create |
| `auth/models/requests/activate-account.request.ts` | Create |
| `migrations/<timestamp>-add-org-account-type.ts` | Generated |
| `migrations/index.ts` | Modify — barrel entry |

### erp-app (mobile)

| File | Action |
|---|---|
| `app/(auth)/activate.tsx` | Create — account setup screen |
| `app/(individual)/_layout.tsx` | Create — individual route group |
| `app/(individual)/*.tsx` | Create — thin wrappers (mirrors org-admin) |
| `src/store/auth.store.ts` | Modify — add `accountType`, `activeOrgId`, `memberships` |
| `src/api/auth.api.ts` | Modify — add `activateAccountApi()` |
| `src/api/apiClient.ts` (or interceptor file) | Modify — add `X-Active-Org` header |
| `src/screens/manager/MoreScreen.tsx` | Modify — org switcher section |
| `app/_layout.tsx` | Modify — updated routing tree |

### ERP-Client (web)

| File | Action |
|---|---|
| Auth types file (`MeResponse` / `OrganizationSummary`) | Modify |
| API client interceptor | Modify — add `X-Active-Org` header |
| Header / profile dropdown component | Modify — org switcher |
| Sidebar navigation | Modify — hide Users for individual context |
| Invite User drawer | Modify — hide for individual context |

---

## 10. What stays unchanged

- All existing org onboarding (`POST /auth/organizations`) — business org creation from web still works, it just creates a second org membership for a user who already has a personal org
- All `organizationId` FK constraints on every entity — unchanged
- All existing guards (`assertOrgOwnership`, `assertLocationAccess`) — unchanged; they read `authUser.organizationId` which is now context-aware
- Existing `(org-admin)/` and `(branch-manager)/` mobile routes — unchanged
- `RegisterMobileUserCommand` — unchanged (staff pre-registered by admin)

---

## 11. Out of scope

- Upgrade path: individual org → business org (not needed; they coexist)
- Creating a new business org from mobile (web only via existing flow)
- Offline mode
- Per-org notification preferences
