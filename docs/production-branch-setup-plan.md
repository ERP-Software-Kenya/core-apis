# Production Branch Setup and Pricing Plan

## Scope and ownership

The local ERP database is the source of truth for organizations, branches, locations, managers, operational roles, and branch prices. Clerk remains the identity provider only. A branch has one optional primary manager; under the current business rule a user may manage at most one non-deleted branch. Every location belongs to at most one branch.

## Target setup flow

1. An organization admin creates the first branch. The API automatically makes it the main branch.
2. The admin selects active, currently unassigned organization locations. The submitted list is authoritative: removed locations are detached.
3. The admin optionally selects an accepted, active local member with the `branch_manager` role. Pending invitees become selectable only after accepting the invitation.
4. The API validates organization ownership, role eligibility, manager uniqueness, location ownership, and branch-code uniqueness inside database-backed invariants.
5. For a later branch, the admin may copy effective prices from the main branch. Effective price means the main branch override when present, otherwise the organization product default.
6. Authentication derives access locally: organization administrators get organization scope; a branch manager gets active locations in the managed branch; location-scoped users get only their active assigned locations; an unassigned branch manager gets no operational location access.

## Changes included in this increment

- Correct local authorization derivation so a user without a branch is not automatically organization-wide.
- Correct branch-manager validation against the global role catalogue and local organization assignment.
- Replace branch locations transactionally, including an empty selection.
- Automatically mark the first organization branch as main.
- Switch main branch transactionally and reject inactive targets.
- Add database uniqueness for one main branch per organization, one branch per manager, and case-insensitive branch code per organization.
- Make “copy from main” copy main-branch overrides with organization defaults as fallback; reject inactive branches and self-copy.
- Add manager and location controls to the desktop branch form.

## Required follow-up before production rollout

### Backend

- Add a migration preflight query/report for duplicate main branches, managers, and codes; clean conflicts before applying the unique indexes.
- Make branch creation plus first-main selection one serializable transaction or implement a retry for the unique-index race.
- Reject deactivation of the main branch and branches with open orders/transfers/sessions; require reassignment or closure first.
- Add an explicit location-transfer command with source/target audit data. General branch update must not silently steal a location owned by another branch.
- Add audit events for manager change, location attach/detach, main-branch change, price override/reset, and price copy.
- Add optimistic versioning/idempotency for bulk price copy and return a copy summary (`inserted`, `updated`, `unchanged`, `failed`).
- Require an explicit organization ID for organization-less super administrators and validate it on every branch/pricing query.
- Protect user-role read endpoints with role and organization guards; add a uniqueness constraint for equivalent local role assignments.

### Desktop and mobile

- Present pending invited managers separately with an “awaiting acceptance” state; do not submit their ID as an assigned manager.
- Add a dedicated transfer confirmation when moving a location between branches.
- Disable main-branch deactivation and explain blocking dependencies returned by the API.
- Add a branch setup review step showing manager, locations, main status, and pricing action before save.
- Mobile should consume the derived branch/location scope but should not expose branch administration unless explicitly required.

### Operations

- Back up the database, run invariant preflight SQL, deploy the API migration, deploy the desktop client, then invalidate active sessions so authorization claims are recalculated.
- Monitor authorization denials, unique-constraint conflicts, price-copy duration/failures, and branch/location reassignment events.
- Roll back the application before dropping indexes. Never roll back by deleting branch/location/price data.

## Test plan

### Unit tests

- Auth: org admin is organization-wide; scoped picker/driver receives only active assigned locations; manager receives only active managed-branch locations; unassigned manager receives none; suspended user is rejected.
- Manager assignment: wrong organization, inactive/missing user, missing manager role, and already-managed branch are rejected; valid accepted manager succeeds.
- Location replacement: add, remove, empty, duplicate IDs, cross-organization ID, missing ID, and rollback-on-error.
- Main branch: first branch becomes main; inactive target is rejected; repeated set-main is idempotent; concurrent switches leave exactly one main.
- Pricing: negative values fail validation; reset removes override; main override is copied; missing override falls back to product default; self/inactive/cross-organization copy is rejected.

### API integration tests

- Create branch with manager and locations, read it back, update the complete selection, and verify detached locations have `branch_id = NULL`.
- Verify branch manager cannot access another branch’s prices or operational locations.
- Verify organization admin can manage all own-organization branches but not another organization.
- Exercise unique-code, unique-manager, and unique-main database conflicts and confirm stable 409 responses.
- Copy prices for products with full, partial, and no main overrides and verify decimal precision.

### Client tests

- Branch form lists only active branch-manager members and unassigned/current locations.
- Edit preselects manager and locations; clearing all locations sends `[]`; clearing manager sends no manager.
- First branch does not prompt to copy prices; later branches do; copy errors remain actionable.
- Permission tests hide mutation controls from non-admin users.

### Migration and release tests

- Run migration against a production-sized anonymized snapshot and record lock duration.
- Run preflight with deliberate duplicate main/manager/code data and confirm deployment stops safely.
- Verify down migration removes only indexes and preserves all business data.
- Smoke-test create/update/set-main/manager assignment/location replacement/price copy after deployment.

## Acceptance criteria

- Exactly one main branch exists for every organization that has branches.
- A manager and every assigned location belong to the same organization as the branch.
- No operational user gains organization-wide access merely because no managed branch exists.
- Branch price copy produces the main branch’s effective prices.
- Branch setup is reproducible through the desktop UI without manual database edits.
- All unit, integration, client, migration, and authorization regression suites pass before release.
