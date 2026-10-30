# Invite User and Organization Membership Context

## Purpose

This is the canonical cross-repository context for inviting ERP users, accepting an invitation in the mobile app, and managing organization users in the desktop client.

It covers:

- `core-apis`: invitation lifecycle, local users, organization membership, roles, access, email delivery, and acceptance.
- `ERP-Client`: organization member and invitation administration.
- `erp-app`: invite deep links, Clerk authentication, invitation acceptance, and role-based routing.

Older user-management plans may remain as historical references, but new implementation decisions should be reconciled into this file.

## Architectural Decision

Clerk is the identity and authentication provider only. Clerk organizations and Clerk organization memberships are not the ERP authorization source because the configured Clerk plan permits only five organization users.

| Concern | Source of truth |
| --- | --- |
| Signup, signin, verification, MFA, sessions | Clerk |
| ERP organizations | PostgreSQL |
| Invitations and their lifecycle | PostgreSQL |
| Organization membership | PostgreSQL |
| ERP roles and location access | PostgreSQL |
| Organization user limits | PostgreSQL/configuration |
| Invitation email | `core-apis` mail service |
| User and invitation administration | `ERP-Client` |

The initial invariant is one active ERP organization per ordinary user. Super administrators remain organization-independent. Multi-organization switching is out of scope until session, authorization, and client routing are redesigned around an explicit active organization.

## User Experience

1. An organization administrator opens Users in `ERP-Client`.
2. The administrator enters an email, ERP role, and optional location.
3. `core-apis` creates a local pending invitation and sends a branded email: “XYZ Organization would like to invite you.”
4. The email links to the configured invite web URL with an opaque token.
5. If the app is installed, the verified universal/app link opens the invite route in `erp-app`.
6. If the app is not installed, the landing page presents environment-configured Android/iOS/desktop install links. After installation, the user reopens the email link or enters the fallback invite code. A later deferred-deep-link provider may remove this extra step.
7. The app validates the invitation, displays the organization and intended role, then starts Clerk signup/signin.
8. After Clerk authentication, the app submits the invite token to `core-apis`.
9. `core-apis` verifies the authenticated email, creates the local user/membership/role records in one transaction, and marks the invitation accepted.
10. The app refreshes `/auth/me` and routes by the locally assigned ERP role.

No Clerk organization membership is created at any stage.

## Canonical API Contract

### Create invitation

`POST /api/v1/organization-invitations`

```json
{
  "email": "picker@example.com",
  "roleId": "role-uuid",
  "locationId": "location-uuid"
}
```

The organization and inviter come from the authenticated local session. Only a super administrator may explicitly select a target organization.

### Administration

- `GET /api/v1/organization-invitations`
- `POST /api/v1/organization-invitations/:id/resend`
- `DELETE /api/v1/organization-invitations/:id`
- `GET /api/v1/organization-members`
- Member role, location, suspension, reactivation, and removal endpoints should operate on local membership records.

### Public validation

`GET /api/v1/public/organization-invitations/:token`

Returns only safe presentation data such as organization name/logo, masked email, role name, status, and expiry.

### Acceptance

`POST /api/v1/organization-invitations/:token/accept`

Requires a Clerk bearer token. The backend reads the verified primary email from the authenticated identity; the client does not submit organization, role, location, or email authorization data.

Acceptance is idempotent for the same user and invitation.

## Local Data Model

`organization_invitations` represents only invitations. `org_members` represents only accepted memberships.

Recommended invitation fields:

- `id`
- `organization_id`
- normalized invited email
- optional invited name
- `role_id`
- optional `location_id`
- `invited_by_user_id`
- unique token hash; never store the raw token
- optional fallback-code hash
- status: `pending`, `accepted`, `expired`, `revoked`, or `failed`
- expiry, acceptance, revocation, last-send, send-count, failure, and audit timestamps
- accepted/revoked actor IDs where applicable

Only one non-expired pending invitation may exist for an organization and normalized email.

## Core Rules

- Normalize email before lookup or uniqueness checks.
- Existing active member in the same organization: return `ALREADY_A_MEMBER`.
- Existing pending invite: return it or use the explicit resend operation.
- User active in another organization: return `USER_ALREADY_IN_ANOTHER_ORGANIZATION` for the initial single-organization model.
- Expired or revoked invite: allow a new invitation.
- Authenticated Clerk email must match the invitation email.
- Validate role grantability and location ownership when creating and accepting an invite.
- Never allow an organization administrator to grant `super_admin`.
- Lock the invitation during acceptance and write user, membership, role, and invitation status in one transaction.
- Invitation tokens must be cryptographically random, hashed at rest, expiring, rate-limited, and redacted from logs.
- Invitation listing, resend, revoke, and membership management must always be scoped to the caller's local organization.

## ERP-Client Requirements

The Users area is backed by local organization APIs rather than global Clerk user or invitation APIs.

It should provide:

- Members and Invitations views.
- Active, pending, expired, revoked, and failed states.
- Email, role, optional location, inviter, sent/expiry/joined dates.
- Invite, resend, revoke, copy-link where authorized, suspend, reactivate, change access, and remove actions.
- Local active-member, pending-invite, and available-seat counts.
- Structured handling for duplicate, cross-organization, expired, revoked, and email-mismatch errors.

The ordinary organization-admin interface must not expose Clerk organization assignment, Clerk-global user search, Clerk metadata roles, or arbitrary redirect URLs.

## erp-app Requirements

- Handle the verified invite URL/custom scheme and extract the opaque token.
- Validate it before authentication and show organization/role context.
- Temporarily persist the token using secure storage while Clerk hosted authentication completes.
- Accept the invitation after authentication.
- Handle expired, revoked, already accepted, and email-mismatch states.
- Refresh `/auth/me` and route to the picker/driver experience based on local roles.
- Explain that a newly installed app may require reopening the email link unless deferred deep linking is introduced.

## Environment Contract

Expected configuration names may be adapted to existing configuration conventions:

```env
ERP_INVITE_WEB_URL=https://invite.example.com
ERP_APP_SCHEME=erpapp
ERP_ANDROID_INSTALL_URL=https://play.google.com/store/apps/details?id=...
ERP_IOS_INSTALL_URL=https://apps.apple.com/app/id...
ERP_DESKTOP_INSTALL_URL=https://downloads.example.com/erp
ERP_INVITE_EXPIRY_HOURS=72
```

The backend must fail clearly or use an explicitly documented safe default when required invite configuration is missing.

## Required Verification

Backend coverage must include creation, duplicate prevention, cross-organization isolation, role/location validation, expiry, resend, revoke, email mismatch, acceptance transactionality, retry idempotency, and single-organization conflicts.

Desktop coverage must include invitation submission, status presentation, resend/revoke, member listing, organization scoping, and structured API failures.

Mobile coverage must include deep-link parsing, validation states, authentication continuation, secure token persistence, acceptance failures, profile refresh, and role routing.

## Implementation Status

Implemented across all three repositories on 2026-10-30:

### `core-apis`

- Added the `core.organization_invitations` entity and migration.
- Stores only SHA-256 invitation-token hashes and enforces one pending invitation per organization/email.
- Added create, list, resend, revoke, public validation, authenticated acceptance, member list, member update/suspension, and member removal endpoints.
- Acceptance writes the local user, organization membership, role/location assignment, and invitation state transactionally and idempotently.
- Added structured invitation errors and exact `erpapp://invite/<token>` links.
- Invitation email uses the configured public landing URL and explains the post-install reopen step.
- Clerk organizations and Clerk organization memberships are not used.
- Suspended users are rejected during session enrichment, and non-active memberships no longer grant roles.
- Backend build, diff validation, and three focused invitation service tests pass.

### `ERP-Client`

- Users management now reads local organization members and invitations.
- Added member/pending counts, local lifecycle statuses, invitation creation, resend, and revoke.
- Removed arbitrary redirect input and Clerk organization assignment from the primary Users workflow.
- Renderer production build and diff validation pass.
- Full Vitest result at implementation time: 124 passing and six pre-existing failures in `src/lib/page-access.test.ts` unrelated to this flow.

### `erp-app`

- Added `erpapp://invite/<token>` routing and public invitation validation.
- Added Clerk hosted signup/signin continuation and authenticated acceptance.
- Persists the pending token in SecureStore and restores the invite route after authentication/app restart.
- Handles invalid, expired, revoked, accepted, and email-mismatch states.
- The Expo web rendering of the route exposes configured app/install links and explains reopening the email after installation.
- TypeScript validation passes.

### Deployment requirements and remaining validation

- Configure production mail credentials and all `ERP_INVITE_*` values in `core-apis`.
- Deploy the Expo web invite route (or an equivalent landing page) at the base configured by `ERP_INVITE_WEB_URL`; the base must end in `/invite` so appending the token resolves the route.
- Configure Android App Links and iOS Universal Links for the production invite domain if direct verified links are required. The custom `erpapp` scheme is implemented as the immediate fallback.
- Run the new database migration in each environment.
- Perform an end-to-end test with a real mail provider, Clerk signup, physical Android/iOS installation, acceptance, and desktop member-list refresh.
- Deferred deep linking through an app-store installation is not included. A newly installing user returns to the email and opens the invitation again.

## Agent Testing Runbook

This section is the canonical continuation point for another agent. Read this entire file before testing. Do not infer Clerk organization membership: Clerk is identity-only and ERP organization access must be proven from PostgreSQL.

### 1. Preserve the workspace

- The three repositories may contain user-owned changes. Inspect `git status --short` in each repository before doing anything.
- Do not reset, discard, or overwrite unrelated files.
- Do not commit or push unless the user explicitly requests it.
- Do not use ChainIT/ChainITHUB for this work.

### 2. Repositories and relevant implementation

#### `core-apis`

- `src/application/modules/organization-members/`
- `src/infrastructure/persistence/entities/organization-invitation.entity.ts`
- `src/infrastructure/persistence/migrations/1793400000000-migration.ts`
- `src/common/auth/strategies/clerk-jwt.strategy.ts`
- `src/tests/application/modules/organization-members/organization-members.service.spec.ts`
- `.env.example`

#### `ERP-Client`

- `renderer/src/pages/Users/index.tsx`
- `renderer/src/pages/Users/components/InviteUserDrawer.tsx`
- `renderer/src/api.ts`
- `renderer/src/types.ts`

#### `erp-app`

- `app/(auth)/invite/[token].tsx`
- `app/(auth)/_layout.tsx`
- `app/_layout.tsx`
- `src/api/invitations.api.ts`
- `src/auth/pending-invitation.ts`
- `.env.example`

### 3. Static verification

Run from `/home/parth/workspace-personal`:

```bash
git -C core-apis diff --check
git -C ERP-Client diff --check
git -C erp-app diff --check

cd core-apis
npm run build
npx jest src/tests/application/modules/organization-members/organization-members.service.spec.ts --runInBand

cd ../ERP-Client
npm run build:renderer
npm test

cd ../erp-app
npx tsc --noEmit
```

Expected baseline at handoff:

- Backend build passes.
- Backend invitation suite passes 3/3.
- Desktop renderer build passes.
- Desktop Vitest previously reported 124 passing and six pre-existing failures in `src/lib/page-access.test.ts`. Re-evaluate those failures, but do not attribute them to this feature without evidence.
- Mobile TypeScript validation passes.

Record any changed result in the Test Execution Log below.

### 4. Environment setup

Configure `core-apis` with real or safe test values:

```env
ERP_INVITE_WEB_URL=https://<deployed-invite-host>/invite
ERP_APP_SCHEME=erpapp
ERP_ANDROID_INSTALL_URL=https://play.google.com/store/apps/details?id=<package>
ERP_IOS_INSTALL_URL=https://apps.apple.com/app/id<id>
ERP_DESKTOP_INSTALL_URL=https://<download-host>/<installer>
ERP_INVITE_EXPIRY_HOURS=72
```

Also configure working database, Clerk, and mail settings. Never copy secrets into this Markdown file or command output.

The configured invite web base must end in `/invite`. The backend appends `/<token>`, matching the Expo route `/invite/[token]`.

### 5. Database verification

1. Back up or use a disposable test database.
2. Run the pending migration using the repository's normal migration command.
3. Confirm `core.organization_invitations` exists.
4. Confirm the pending-email partial unique index exists.
5. Confirm invitation foreign keys reference organizations, roles, locations, and users.
6. Confirm the raw invitation token never appears in the database; only a 64-character hash should be stored.

Do not manually modify migration history in a shared environment.

### 6. Backend API scenarios

Use authenticated test accounts for an organization admin, super admin, and invitee. Capture response status and safe response fields, but redact bearer tokens and invitation tokens from saved logs.

#### Happy path

1. Create an invitation with email, role, and optional location.
2. Confirm a pending local record is created.
3. Confirm one email is delivered with the correct organization and role.
4. Validate the public token endpoint.
5. Confirm the response contains `invitedEmailMasked` and `erpapp://invite/<token>`.
6. Authenticate as the invited email and accept.
7. Confirm local `users`, `org_members`, and `user_roles` records were created/updated.
8. Confirm the invitation is accepted.
9. Repeat acceptance and confirm it is idempotent.

#### Administrative lifecycle

1. List invitations as the owning organization admin.
2. Resend a pending invitation and verify the old token stops working.
3. Revoke a pending invitation and verify acceptance returns `INVITATION_REVOKED`.
4. Expire an invitation in a test database and verify `INVITATION_EXPIRED`.
5. Verify failed mail delivery records `failed` and does not create membership.

#### Authorization and isolation

1. An organization admin cannot list, resend, or revoke another organization's invitations.
2. An organization admin cannot manage another organization's members.
3. A location from another organization is rejected.
4. `super_admin` cannot be granted through an invitation.
5. An authenticated email different from the invited email receives `INVITATION_EMAIL_MISMATCH`.
6. A user already active in another organization is rejected under the current single-organization invariant.
7. A suspended member receives no effective role and cannot use ERP APIs.
8. Removing a member deletes their local role access without deleting/banning their Clerk identity.
9. A removed identity can be invited and activated again.

### 7. ERP-Client scenarios

1. Open Users as an organization admin.
2. Confirm only local members and invitations for that organization appear.
3. Create an invitation with email, role, and organization-wide access.
4. Create an invitation with a store/location.
5. Confirm pending count and invitation row update without restarting the client.
6. Filter invitations by pending, accepted, expired, revoked, and failed.
7. Resend and verify the sent count/status update.
8. Revoke and verify the row changes and the link becomes unusable.
9. Confirm arbitrary redirect URL and Clerk organization assignment are absent from the primary flow.
10. Confirm a super admin can select a target organization and an organization admin cannot override theirs.

The backend supports member update/suspension/removal, but the desktop controls for those operations remain an explicit follow-up unless added and verified by the testing agent.

### 8. Mobile and landing-page scenarios

Test web, Android, and iOS where available.

1. Open `https://<invite-host>/invite/<token>` without the app.
2. Confirm organization name, masked email, and role display correctly.
3. Confirm Android/iOS installation links use configured values.
4. Install the app, return to the email, and open the link again.
5. Confirm `erpapp://invite/<token>` opens the invite screen.
6. Complete Clerk signup using the invited email.
7. Accept and confirm routing to the correct picker/driver experience.
8. Repeat with an existing Clerk account using the invited email.
9. Sign in with the wrong email and confirm “Use another account” recovery.
10. Interrupt/restart during authentication and confirm SecureStore restores the pending invite route.
11. Verify invalid, expired, revoked, accepted, and offline/network-error states.
12. Confirm tokens are not printed to application logs or analytics.

Deferred deep linking through first-time app-store installation is not expected. The supported flow is install, return to the email, then open the invitation again.

### 9. Regression checks

- Existing Clerk signin and `/auth/sync` still work for active users.
- Existing organization onboarding still creates the initial administrator membership.
- Picker and driver routing remains unchanged for existing users.
- Store-scoped authorization still restricts data correctly.
- Super-admin access remains available without a normal organization membership.
- Existing desktop Users navigation still resolves to `/users`.

### 10. Sign-off criteria

The feature is ready for production only when all of the following are true:

- Migration applied successfully in a production-like environment.
- Real invitation email delivered and rendered correctly.
- Invite landing page deployed at the configured URL.
- Physical-device Android flow passed.
- Physical-device iOS flow passed, or explicitly waived when iOS is not supported for the release.
- Organization isolation and wrong-email tests passed.
- Acceptance retry proved idempotent.
- Revoke, resend, expiry, suspension, removal, and re-invitation passed.
- No raw tokens or secrets appeared in database fields, logs, screenshots, or reports.
- Desktop active-member management follow-up is either completed or explicitly accepted as out of scope.

## Test Execution Log

Append new entries; do not erase earlier evidence.

| Date | Agent/person | Environment | Checks run | Result | Evidence / remaining issue |
| --- | --- | --- | --- | --- | --- |
| 2026-10-30 | Codex | Local workspace | Backend build; focused backend invitation tests; desktop renderer build; mobile TypeScript; diff checks | Pass | Backend 3/3; desktop build passed; mobile typecheck passed |
| 2026-10-30 | Codex agents | Local workspace | Full desktop Vitest | Partial | 124 passed; six pre-existing `page-access.test.ts` failures require separate confirmation |
