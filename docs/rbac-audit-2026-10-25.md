# Core APIs RBAC Audit

Date: 2026-10-25

## Authentication hardening implemented

The API now treats Clerk as the production session and token authority. It does not issue a custom long-lived access or refresh token. Short-lived Clerk JWTs are verified by the API, while the Clerk client SDK silently renews them for an active desktop session.

Implemented controls:

- JWT verification uses a configured JWKS URL, exact issuer, audience, RS256, and authorized-party allowlist.
- Inactive Clerk sessions and inactive local users are rejected.
- Organization membership resolution is restricted to the user's active local organization and active membership records.
- Backend password login, token minting, development lookup, and mobile registration endpoints are unavailable in production.
- Anonymous authentication endpoints have dedicated rate limits and credential failures no longer reveal whether an email exists.
- A global API rate limiter is enabled, with configurable trusted proxy hops for correct client-IP handling.
- Production CORS is restricted to the configured trusted application origins.
- Production startup fails when required Clerk verification settings are missing.

Required production settings are `CLERK_SECRET_KEY`, `CLERK_JWKS_URL`, `CLERK_ISSUER`, `CLERK_AUDIENCE`, and `CLERK_AUTHORIZED_PARTIES`. Set `API_TRUST_PROXY_HOPS` to the exact number of trusted reverse proxies in front of the API.

The organization-membership portion of critical finding 2 below has been remediated. The broader location-scoped `user_roles` issue in finding 3 still requires the RBAC redesign described in this report.

## Account device and session registry

The application stores security metadata for each Clerk session in `core.user_sessions`. Stored data includes the internal user, Clerk session identifier, installation/device identifier, device label, platform, app version, IP address, user agent, timestamps, and lifecycle status. JWTs, refresh tokens, passwords, and Clerk secrets are never stored in this table.

The desktop client registers the device after authentication and sends a throttled activity heartbeat every five minutes while visible. Users can open **Devices & sessions** from the account menu to view recent activity and remotely revoke an owned session. Revocation is applied to Clerk first and then reflected locally. Verified Clerk `session.revoked`, `session.ended`, and `session.removed` webhooks reconcile lifecycle changes made outside the ERP client.

Deployment requirements:

1. Run migration `1792890000000-migration.ts`.
2. Configure the Clerk webhook URL as `POST /api/v1/auth/webhooks/clerk`.
3. Subscribe it to `session.revoked`, `session.ended`, and `session.removed`.
4. Set its signing secret as `CLERK_WEBHOOK_SECRET`.

## Executive summary

The current RBAC implementation should not yet be considered complete or secure. Authentication and organization filtering are present, and focused RBAC tests pass, but there are critical weaknesses in tenant isolation, organization-specific role resolution, branch and location scoping, and the effective permissions of Driver and Packer roles.

The implementation is currently based on hard-coded role decorators such as `@Roles(...)`. Although `permissions` and `role_permissions` tables exist, they are not used during runtime authorization.

## Critical findings

### 1. Cross-organization access through the warehouse order endpoint

`src/application/modules/order-operations/order-operations.controller.ts:247` accepts an arbitrary order ID. At line 252 it checks the caller's organization against the caller's own organization:

```typescript
assertOrgOwnership(user, requireOrganizationId(user), 'order');
```

This check always succeeds. The underlying handler at `src/application/modules/orders/queries/get-order/get-order.query-handler.ts:17` loads an order only by ID and does not apply an organization or location constraint.

As a result, a Branch Manager, Org Admin, or Super Admin who knows an order UUID from another organization can retrieve that order through `GET /warehouse/orders/:id`.

The normal order endpoint performs the appropriate ownership and location checks at `src/application/modules/orders/orders.controller.ts:59-68`. The warehouse endpoint should use the same checks or use an organization-scoped query.

### 2. Roles from different organizations were combined — remediated

The original implementation loaded every `org_members` record belonging to the user and combined all resulting roles. It did not limit memberships by:

- The active organization
- `dbUser.organizationId`
- The organization in the Clerk session
- Membership status

This has been corrected in `src/common/auth/strategies/clerk-jwt.strategy.ts`: organization roles now come only from active membership records matching `dbUser.organizationId`, and the managed branch lookup is constrained to that organization.

The remaining unscoped system-role/location behavior is tracked in finding 3.

### 3. Store-scoped role assignments are ignored

`src/infrastructure/persistence/entities/user-role.entity.ts:32-35` defines `locationId` as an optional role scope, where a non-null value limits a role to a store.

However, `src/common/auth/strategies/clerk-jwt.strategy.ts:103-123` reads the role names but ignores the role assignments' `locationId` values. Scope is determined only by whether a branch exists with `branches.user_id` equal to the current user:

- If a managed branch exists, the user is branch-scoped.
- If no managed branch exists, the user receives organization-wide access.

This can cause the following incorrect behavior:

- A store-scoped Packer or Driver receives organization-wide scope.
- A Branch Manager without a branch assignment receives organization-wide scope.
- An Org Admin who also has a branch assignment becomes branch-restricted.
- A role assigned for one store can be used on data belonging to other stores.

Access scope should be derived from the relevant role assignment and its organization, branch, and location scope—not from branch existence alone.

## Major findings

### 4. Driver and Packer cannot access their intended workflows

The seeded role descriptions state that:

- Driver manages trips and confirms deliveries.
- Packer claims and packs orders for dispatch.

However, the field-operation endpoints at `src/application/modules/trip-operations/trip-operations.controller.ts` allow only Org Admin and Super Admin. This includes `GET /field-ops/driver/trips/today`, which is apparently intended for a Driver.

The warehouse workflow at `src/application/modules/order-operations/order-operations.controller.ts:40-44` allows only Org Admin, Super Admin, and Branch Manager. Packer cannot access the order queue, claim an order, or pack an order.

There is also an impersonation risk in self-service operations:

- Packing accepts `packerUserId` from the request body at `order-operations.controller.ts:190-200`.
- Several delivery operations accept driver IDs from request bodies at `trip-operations.controller.ts:115-128` and `:161-195`.

When the actor is a Packer or Driver, their identity should normally come from `AuthenticatedUser.dbUserId`. Administrative endpoints that act on behalf of another user should be separately authorized.

### 5. Endpoints without role metadata use default-allow authorization

`src/common/auth/guards/roles.guard.ts:22-24` returns `true` when no required roles are declared.

Many controllers use only `ClerkAuthGuard`, so any onboarded role can potentially access operations unrelated to its responsibilities. Examples include creating or updating:

- Drivers
- Customers
- Expenses
- Payment transactions
- Vehicles
- Trips

This is particularly risky because forgetting `@Roles(...)` on a newly added endpoint silently gives every authenticated role access.

A safer design would require explicit authorization for application endpoints, using default-deny behavior. Public or general authenticated endpoints should be deliberately marked as such.

### 6. The permission tables are not enforced

The following entities exist:

- `src/infrastructure/persistence/entities/permission.entity.ts`
- `src/infrastructure/persistence/entities/role-permission.entity.ts`

No runtime guard or authorization service reads these tables. Effective authorization is determined solely by hard-coded `ERole` lists in controllers.

Therefore, database permission assignments currently have no effect on API access.

### 7. Custom role creation is internally inconsistent

`src/infrastructure/persistence/entities/role.entity.ts:15-20` restricts role names to five enum values:

- `super_admin`
- `org_admin`
- `branch_manager`
- `driver`
- `packer`

In contrast, `src/application/modules/roles/models/requests/create-role.request.ts:5-8` accepts an arbitrary role name and a permissions object. The command handler at `src/application/modules/roles/commands/create-role/create-role.command-handler.ts:17-20` casts the command to `any` and saves it. The supplied permissions are not persisted or enforced.

The system should choose one consistent model:

1. Keep five fixed roles and remove misleading custom-role and permission behavior; or
2. Implement data-driven roles and enforce `role_permissions` at runtime.

## Recommended role scopes

| Role | Recommended scope |
| --- | --- |
| Super Admin | Platform-wide organization and platform configuration. Routine tenant actions should require an explicit support or impersonation context. |
| Org Admin | Organization-wide administration of users, branches, settings, inventory, billing, and operational oversight. No access to other organizations. |
| Branch Manager | Only the assigned branch and its locations. Operational management without platform configuration or unrestricted role administration. |
| Packer | Assigned warehouse or location only. View the relevant queue, claim work, pack assigned orders, and read only the customer/order information needed for packing. |
| Driver | Only trips assigned to the authenticated driver. Update their own trip status and location and perform appropriate delivery and OTP actions. No fleet-wide access. |

## Recommended remediation order

1. Fix `GET /warehouse/orders/:id` tenant and location ownership checks.
2. Resolve roles using one active organization and active membership only.
3. Correct `hasOrgWideAccess`, branch scope, and location scope derivation.
4. Define and implement the exact Driver and Packer workflows using authenticated identity.
5. Introduce a centralized, default-deny authorization policy.
6. Decide between fixed roles and data-driven permissions.
7. Add request-level authorization and tenant-isolation tests.

## Verification performed

The following focused test suites were run:

- `src/tests/common/auth/guards/roles.guard.spec.ts`
- `src/tests/common/auth/rbac-guard-coverage.spec.ts`
- `src/tests/application/modules/purchase-returns/purchase-return-branch-scope.spec.ts`
- `src/tests/application/modules/sales-returns/sales-return-location-scope.spec.ts`

Result:

- 4 test suites passed
- 65 tests passed
- 0 tests failed

Most RBAC coverage tests verify decorator source text rather than executing real HTTP requests. They do not prove tenant isolation or correct role and location resolution, which is why the critical issues above are not detected by the current test suite.

Repository history includes RBAC work in PR `#152`, which expanded Branch Manager access to operational controllers. Driver and Packer were not similarly connected to their intended workflows.

The ChainIT fleet gateway requested by the repository instructions was unavailable during this audit. The findings are grounded in the local repository, its tests, documentation, and git history.

## Business rules requiring confirmation

Before finalizing the corrected authorization matrix, the following rules need confirmation:

1. Can a user belong to multiple organizations and switch between them?
2. Is a Packer assigned to one warehouse/location, one branch, or the entire organization?
3. Can a Driver see only their own assigned trips?
4. Should a Driver personally initiate and confirm delivery OTP operations?
5. Can Branch Managers create or modify products, suppliers, purchase orders, and sales orders, or should some of these operations remain Org Admin-only?

## ERP mobile application audit

The mobile application at `/home/parth/workspace-personal/erp-app` is not currently production-ready and is not compatible with the hardened Clerk authentication/session flow or the present field-operation API contracts.

### Critical mobile findings

1. **Production login is unavailable.** `erp-app/src/api/auth.api.ts:12-14` calls `POST /v1/auth/login`, but `core-apis/src/application/modules/auth/auth.controller.ts:127-143` explicitly limits that endpoint to development/local/test. A production build therefore has no usable sign-in path. The mobile app should use the Clerk Expo SDK and Clerk's native session lifecycle; backend password login should remain a testing-only convenience.
2. **The app cannot refresh authentication silently.** `erp-app/src/api/client.ts:12-27` reads one stored JWT and deletes it on the first `401`. It has no Clerk session or refresh mechanism, so an active Driver or Packer is forced back to login when the short-lived Clerk JWT expires. API requests should obtain a current Clerk token on demand, retry a single `401` with `skipCache`, and sign out only when Clerk reports no active session.
3. **Authentication material is stored as a raw long-lived application value.** Native storage at `erp-app/src/api/auth-storage.ts:3-8` persists the JWT directly in MMKV, while the web fallback at `erp-app/src/api/auth-storage.web.ts:1-5` persists it in `localStorage`. Clerk's token cache should use platform secure storage on native devices; access tokens should not be manually treated as the durable session.
4. **Role and identity derivation is incompatible with the backend.** `erp-app/src/store/auth.store.ts:4-13` expects one uppercase `PICKER` or `DRIVER` role plus organization and location fields inside the JWT. The canonical backend roles are lowercase `packer` and `driver` at `core-apis/src/infrastructure/persistence/entities/role.entity.ts:15-20`, and authoritative roles/scope are returned by `GET /v1/auth/me` (`roles`, `organization`, `locationIds`, and `hasOrgWideAccess`) rather than trusted from custom token fields. The app also silently routes every non-Picker token to the Driver interface at `erp-app/app/(auth)/login.tsx:50-55`.
5. **Driver and Packer are denied by backend RBAC.** Driver routes in `core-apis/src/application/modules/trip-operations/trip-operations.controller.ts:69-205` permit only Org Admin and Super Admin. Warehouse routes have the same problem for Packer at `core-apis/src/application/modules/order-operations/order-operations.controller.ts:40-44`. Even after fixing mobile authentication, the intended staff cannot use their workflows.

### Broken mobile/backend API contracts

- Mobile warehouse calls use `/v1/orders/...` at `erp-app/src/api/orders.api.ts:30-49`; the backend controller is `/v1/warehouse/orders/...` at `order-operations.controller.ts:40-44`.
- The order queue requires `locationId` (`order-operations.controller.ts:97-108`), but the mobile request does not send it.
- Claim and pack require authenticated-user-safe contracts, but the backend currently requires body-supplied `pickerUserId` and `packerUserId` (`order-operations.controller.ts:167-203`) while the app sends neither. These IDs should be derived from `AuthenticatedUser.dbUserId`, not added to the mobile payload.
- Mobile fleet calls use `/v1/driver/...` and `/v1/trips/...` at `erp-app/src/api/trips.api.ts:28-60` and `src/api/location.api.ts:9-13`; the backend controller prefix is `/v1/field-ops` at `trip-operations.controller.ts:40-44`.
- The mobile UI expects complete trip details (`vehiclePlate`, stops, counts) from routes that do not exist in the field-operations controller. The existing `GET /v1/field-ops/driver/trips/today` response contains only summary fields (`trip-operations.controller.ts:69-88`).
- Delivery initiation/confirmation currently require `driverUserId` in the request body (`trip-operations.controller.ts:155-196`), but the app sends no driver ID. As with packing, the backend should derive the acting driver from the authenticated session.
- Live location currently requires `driverId` in the body (`trip-operations.controller.ts:110-129`), but `erp-app/src/api/location.api.ts:3-13` does not send it. The safer backend contract is to derive the driver ID from the authenticated session.
- Background GPS queues `userId` but not `tripId` at `erp-app/app/(driver)/_layout.tsx:13-29`; the queue later posts to a route containing `payload.tripId` at `erp-app/src/store/queue.store.ts:50-55`, producing an `undefined` trip URL.

### Session, device, and fleet gaps

- The app registers only an Expo push token (`erp-app/app/_layout.tsx:54-76`). It never calls `POST /v1/auth/sessions`, so the backend session/device registry cannot show this mobile login, device metadata, activity, or last-seen information.
- App logout only deletes the local token at `erp-app/app/(shared)/profile.tsx:12-21`; it does not end the Clerk session or notify the backend session registry.
- The background queue is loaded but no connectivity listener calls `flush()` in `erp-app/app/_layout.tsx:33-40`. Offline driver updates can therefore remain queued indefinitely.
- GPS data is queued but not associated with the active trip, and the app has no durable active-trip model. This prevents reliable fleet tracking when the application is backgrounded or restarted.
- Native deep-link configuration already exists through `scheme: "erpapp"` in `erp-app/app.json`, which is sufficient as the application-side base for Clerk OAuth callbacks. Exact Clerk redirect URLs still need to be configured for development and production application IDs.

### Required production architecture

1. Integrate `@clerk/clerk-expo` at the root with a secure native token cache and Clerk-managed email/password (plus OAuth if required).
2. After Clerk sign-in, call `POST /v1/auth/sync`, then `GET /v1/auth/me`; store only non-secret user context in Zustand.
3. Build API authorization around Clerk `getToken()`, one forced-refresh retry on `401`, and session-aware logout.
4. Register/upsert the mobile session and device metadata through `POST /v1/auth/sessions`; periodically touch activity, and end it during explicit logout. Keep Expo push-token registration separate.
5. Normalize mobile role routing to backend `packer` and `driver` roles and reject every unsupported role explicitly.
6. Correct the warehouse and field-operation routes and response DTOs in both repositories.
7. Permit Packer/Driver only on their intended endpoints, derive actor identity from the authenticated user, and enforce assigned location/trip ownership in backend handlers.
8. Persist the active trip ID, include it in background GPS events, flush offline work on connectivity recovery, and make queued mutations idempotent.

### Mobile verification

- `npx tsc --noEmit` passed in `erp-app`.
- The repository has no test script or automated auth/API contract tests in `package.json`.
- TypeScript success confirms only static consistency inside the app; it does not catch the verified route, payload, role, RBAC, or session-lifecycle incompatibilities above.
