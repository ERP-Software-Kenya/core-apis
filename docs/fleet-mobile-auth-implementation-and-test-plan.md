# Fleet Mobile Authentication: Implementation Context and Test Plan

Date: 2026-10-25

## Purpose

This document is the durable engineering context for the Clerk-authenticated ERP mobile application, warehouse Packer workflow, Driver workflow, background GPS updates, device/session history, and fleet tracking. Use it when diagnosing authentication, authorization, session, trip ownership, offline queue, or live-location defects.

## Repositories

- Backend: `/home/parth/workspace-personal/core-apis`
- Mobile app: `/home/parth/workspace-personal/erp-app`
- Web onboarding: `/home/parth/workspace-personal/Web-ERP`
- Desktop client: `/home/parth/workspace-personal/ERP-Client`

## Final architecture

### Authentication and token lifecycle

1. The mobile app uses Clerk directly through `@clerk/expo`.
2. `ClerkProvider` uses Clerk's SecureStore-backed `tokenCache`. The application does not persist or mint refresh tokens.
3. Clerk owns the long-lived session. Its short-lived session JWT is obtained through `getToken()` for each API request.
4. The Axios client retries one `401` with `getToken({ skipCache: true })`. It does not log the user out merely because one API token expired.
5. When the application returns to the foreground, it forces a Clerk token refresh and reruns account/session synchronization.
6. Backend password login remains available only for local/development testing. Production mobile login does not call it.

Relevant files:

- `erp-app/app/_layout.tsx`
- `erp-app/app/(auth)/login.tsx`
- `erp-app/src/api/client.ts`
- `erp-app/src/store/auth.store.ts`
- `core-apis/src/application/modules/auth/auth.controller.ts`

### User, role, and scope hydration

After Clerk activates a session, the mobile app calls:

1. `POST /api/v1/auth/sync`
2. `GET /api/v1/auth/me`
3. `POST /api/v1/auth/sessions`

`GET /auth/me` is authoritative for the local database user ID, roles, organization, branch, and allowed locations. The app does not derive authorization from unverified JWT decoding. Only the canonical lowercase `packer` and `driver` roles can enter mobile operational routes.

### Session and device history

The application registers a stable platform installation identifier, device name/model, platform, and native application version. It refreshes `lastActiveAt` every five minutes and when returning to the foreground. Explicit logout records the backend session end before Clerk sign-out. Expo push-token registration remains separate from account-session/device tracking.

Relevant files:

- `erp-app/src/auth/device-session.ts`
- `erp-app/src/api/auth.api.ts`
- `core-apis/src/application/modules/auth/user-session.service.ts`
- `core-apis/src/infrastructure/persistence/entities/user-session.entity.ts`
- `core-apis/src/infrastructure/persistence/migrations/1792890000000-migration.ts`

### Packer authorization

- Packer may read queues only for IDs present in `AuthenticatedUser.locationIds`.
- Packer may read, claim, and pack only orders in an assigned location and the authenticated organization.
- `pickerUserId` and `packerUserId` are derived from `AuthenticatedUser.dbUserId`; the client cannot act as another employee by changing a request body.
- Org Admin and Super Admin retain organization-wide access; Branch Manager remains limited by resolved location scope.

Relevant file: `core-apis/src/application/modules/order-operations/order-operations.controller.ts`.

### Driver identity and trip ownership

The operational user and transport Driver record are intentionally separate database concepts. `core.drivers.user_id` links one Driver profile to one authenticated user.

- Migration: `1792891000000-migration.ts`
- Driver create/update APIs accept an optional `userId` for Org Admin assignment.
- Driver mobile endpoints resolve the Driver record by the authenticated database user.
- Every Driver mutation checks that `trip.driverId` equals that Driver profile ID.
- Driver IDs are no longer trusted from location or OTP request bodies.
- Fleet-wide live locations remain Org Admin/Super Admin only.
- Fleet live-location queries join through vehicle ownership and filter by the authenticated organization in the database.

Before deploying mobile access for an existing driver, link the records through the Driver update API or a reviewed data migration. Do not guess links solely from names. Email matching may be used to prepare a report for human confirmation, but should not silently update production data.

### Mobile fleet routes

| Use | Method and route | Role/scope |
| --- | --- | --- |
| Today's assigned trips | `GET /api/v1/field-ops/driver/trips/today` | Driver, own profile |
| Assigned trip detail | `GET /api/v1/field-ops/driver/trips/:id` | Driver, own trip |
| Start/complete trip | `PATCH /api/v1/field-ops/trips/:id/status` | Driver, own trip |
| Upload location | `POST /api/v1/field-ops/trips/:id/location` | Driver, own trip |
| Initiate delivery OTP | `POST /api/v1/field-ops/trips/:tripId/stops/:stopId/initiate-delivery` | Driver, own trip |
| Confirm delivery OTP | `POST /api/v1/field-ops/trips/:tripId/stops/:stopId/confirm-delivery` | Driver, own trip |
| Resend OTP | `POST /api/v1/field-ops/trips/:tripId/stops/:stopId/resend-otp` | Driver, own trip |
| Fleet live map | `GET /api/v1/field-ops/fleet/live-locations` | Org Admin/Super Admin, own org |

### Background GPS and offline behavior

1. Foreground and background location permissions are required before a trip is marked in transit.
2. The active trip ID is persisted separately from the authentication session.
3. Background location events enqueue the active trip ID with latitude, longitude, and accuracy.
4. The queue posts only after the authenticated application is active and can obtain a current Clerk token.
5. Connectivity recovery triggers queue flushing. Failed mutations remain queued.
6. Completing all stops marks the trip complete, stops background tracking, and clears the active trip ID.

Relevant files:

- `erp-app/app/(driver)/_layout.tsx`
- `erp-app/src/store/active-trip.ts`
- `erp-app/src/store/queue.store.ts`
- `erp-app/app/_layout.tsx`

## Required configuration

### Mobile build environment

Set these build-time variables (see `erp-app/.env.example`):

- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `EXPO_PUBLIC_API_URL` including the `/api` prefix
- `EXPO_PUBLIC_CENTRIFUGO_URL`

The application scheme is `erpapp`. In Clerk, enable the Native API for the correct development/production instance and configure approved native redirect URLs using this scheme if OAuth is enabled. Keep development and production Clerk keys separated by EAS build profile.

### Backend Clerk configuration

Configure the exact Clerk issuer, JWKS URL, audience, authorized parties, secret key, and Clerk webhook signing secret. The Clerk session lifecycle webhook must reach `POST /api/v1/auth/webhooks/clerk`.

### Database deployment

Apply both session/device and Driver-link migrations before enabling mobile production traffic:

- `1792890000000-migration.ts`
- `1792891000000-migration.ts`

## Fleet module test plan

Run tests with at least two organizations, two Drivers, two vehicles, two active trips, a Packer assigned to one warehouse, an Org Admin, and a user with no mobile role.

### A. Authentication and continuity

| ID | Scenario | Expected result |
| --- | --- | --- |
| AUTH-01 | Valid Driver email/password sign-in | Clerk session activates; sync/me/session calls succeed; Driver home opens. |
| AUTH-02 | Valid Packer sign-in | Packer queue opens and only assigned locations are requested. |
| AUTH-03 | Org Admin signs into mobile app | Access-denied account screen; no Driver/Packer route opens. |
| AUTH-04 | Wrong password | Clerk error is shown; no local auth state is created. |
| AUTH-05 | Let several 60-second JWT rotations pass while active | API calls continue without user logout. |
| AUTH-06 | API returns one `401` for an expired token | One forced token refresh and one retry occur. |
| AUTH-07 | Clerk session is revoked | Clerk becomes signed out and the login screen is shown. |
| AUTH-08 | Device goes offline and returns online | Existing UI remains usable where cached; queued GPS flushes after authentication refresh. |
| AUTH-09 | App is killed and reopened | Secure Clerk session restores; no password prompt while the Clerk session remains valid. |
| AUTH-10 | Explicit logout | Backend session is ended, Clerk signs out, and operational routes are inaccessible. |

### B. Session and device records

| ID | Scenario | Expected result |
| --- | --- | --- |
| SESSION-01 | First login on Android/iOS | One active `user_sessions` row contains stable device ID, device name, platform, and app version. |
| SESSION-02 | Remain active for over five minutes | Same Clerk session row is updated; no duplicate session row. |
| SESSION-03 | Login on a second device | A second device/session appears for the same user. |
| SESSION-04 | Logout normally | Current row becomes signed out with `endedAt`. |
| SESSION-05 | Revoke through Clerk | Webhook changes the matching local session to revoked. |
| SESSION-06 | Send forged webhook | Backend returns unauthorized and does not change session data. |

### C. Driver ownership and RBAC

| ID | Scenario | Expected result |
| --- | --- | --- |
| DRIVER-01 | Driver requests today's trips | Only trips assigned to the linked Driver profile are returned. |
| DRIVER-02 | Driver requests another Driver's trip detail | `404`; no trip/customer information leaks. |
| DRIVER-03 | Driver updates another Driver's trip status | `404`; trip remains unchanged. |
| DRIVER-04 | Driver uploads GPS against another trip ID | `404`; no vehicle location changes or event publishes. |
| DRIVER-05 | Driver initiates/confirms OTP on another trip | `404`; no email or delivery mutation occurs. |
| DRIVER-06 | Driver account has no linked Driver profile | `403` with actionable linkage error. |
| DRIVER-07 | Packer calls Driver endpoint | `403`. |
| DRIVER-08 | Driver calls fleet-wide live-location endpoint | `403`. |
| DRIVER-09 | Org A admin loads fleet map | Only Org A in-transit vehicles are returned. |
| DRIVER-10 | Super Admin loads a tenant fleet context | Only the explicitly resolved tenant is returned; verify support-context policy. |

### D. Trip execution and GPS

| ID | Scenario | Expected result |
| --- | --- | --- |
| TRIP-01 | Driver denies foreground permission | Trip does not enter in-transit status. |
| TRIP-02 | Driver denies background permission | Trip does not enter in-transit status. |
| TRIP-03 | Permissions accepted and trip starts | Active trip ID persists; status becomes `in_transit`; background service starts. |
| TRIP-04 | App backgrounds for 10+ minutes | GPS events contain the active trip ID and are queued without tokens. |
| TRIP-05 | Network recovers | Queue flushes in order using a fresh Clerk token. |
| TRIP-06 | Process restarts during trip | Persisted active trip continues associating updates with the correct trip. |
| TRIP-07 | All stops delivered | Trip becomes `completed`; GPS service stops; active trip ID is removed. |
| TRIP-08 | API fails during start | GPS service is stopped and trip is not presented as started. |
| TRIP-09 | Duplicate GPS retry | Vehicle current location is upserted safely; no duplicate business event corrupts state. |

### E. Packer and warehouse scope

| ID | Scenario | Expected result |
| --- | --- | --- |
| PACK-01 | Packer loads assigned warehouse queue | Only orders from assigned `locationIds` appear. |
| PACK-02 | Packer supplies an unassigned location ID | `403`. |
| PACK-03 | Packer requests another organization's order UUID | `403` or `404`; no data leaks. |
| PACK-04 | Packer claims an order | `claimedByUserId` equals authenticated DB user; no actor ID is accepted from client. |
| PACK-05 | Second Packer claims the same order | Conflict; original claim remains. |
| PACK-06 | Packer packs an order claimed by another user | Forbidden/conflict; order remains unchanged. |
| PACK-07 | Driver calls warehouse Packer endpoint | `403`. |

### F. OTP and customer delivery

| ID | Scenario | Expected result |
| --- | --- | --- |
| OTP-01 | Assigned Driver initiates OTP | Masked destination returned; raw OTP is not logged or returned. |
| OTP-02 | Incorrect/expired OTP | Delivery remains incomplete. |
| OTP-03 | Valid OTP | Stop becomes delivered once. |
| OTP-04 | Resend before cooldown | Rate/cooldown error. |
| OTP-05 | Replay valid OTP | No duplicate delivery transition. |

### G. Performance and reliability

| ID | Scenario | Expected result |
| --- | --- | --- |
| PERF-01 | 100 active trips in one organization | Fleet endpoint stays within agreed latency and does not expose other organizations. |
| PERF-02 | 1,000 queued GPS events | Flush is bounded, observable, and does not freeze UI; define batching if load test fails. |
| PERF-03 | Centrifugo unavailable | Core location update succeeds; publish failure is logged as non-fatal. |
| PERF-04 | Push service unavailable while packing | Pack succeeds; notification failure remains non-fatal. |

## Automated verification commands

Backend:

```bash
cd /home/parth/workspace-personal/core-apis
npm run build
npm test -- --runInBand
```

Mobile static/build verification:

```bash
cd /home/parth/workspace-personal/erp-app
npx tsc --noEmit
npx expo export --platform web
```

Native behavior—including SecureStore restoration, background GPS, OS permission prompts, app termination, and push tokens—must also be executed on real Android and iOS development builds. Expo web cannot validate native background services.

## Debugging map

| Symptom | Inspect first |
| --- | --- |
| User is logged out every minute | `erp-app/src/api/client.ts`, Clerk publishable key/issuer/audience, server `401` reason. |
| Signed in but stuck on account unavailable | `/auth/sync`, `/auth/me`, local role assignment, organization membership, Driver profile `user_id`. |
| Driver sees no trips | `core.drivers.user_id`, `core.trips.driver_id`, trip date/status, `GetDriverTripsTodayQueryHandler`. |
| GPS shows `undefined` trip | Active-trip storage and `app/(driver)/_layout.tsx`; inspect persisted queue payload. |
| GPS updates but fleet map is empty | Trip must be `in_transit`; verify vehicle location row, vehicle organization, and Centrifugo separately. |
| Packer queue is empty | `/auth/me.locationIds`, order `location_id`, queue status, and request query parameter. |
| Session/device page is empty | `/auth/sessions` upsert response, database migration, Clerk JWT `sid`, and device identifier. |
| Cross-tenant fleet rows | `TripRepo.findByStatusAsync` organization join and authenticated organization resolution. |

## Verification record for this implementation

- Backend production build: passed.
- Backend Jest suite: 34 suites and 172 tests passed.
- Mobile TypeScript check: passed after Clerk/Expo integration.
- Expo web production export: passed.
- Expo SDK dependency compatibility check: passed after aligning Location, Notifications, Task Manager, FlashList, Reanimated, and Worklets to Expo 57-supported versions.
- `npm audit fix` removed the fixable critical/high transitive advisories without a forced major upgrade. The remaining audit result is 15 transitive advisories (10 moderate, 5 high) in the Expo CLI/code-signing, Expo Router query-string, NativeWind/PostCSS, and development ngrok dependency paths. npm offers only breaking forced changes for most of these; track Expo/NativeWind upstream releases and reassess before store release.
- Native device execution: required before release because it needs configured Clerk credentials, migrated database data, OS permissions, and physical/emulated native runtime.

The ChainIT fleet gateway required by repository instructions was unavailable. Contract impact was grounded through local cross-repository searches across `core-apis`, `erp-app`, `ERP-Client`, and `Web-ERP`.
