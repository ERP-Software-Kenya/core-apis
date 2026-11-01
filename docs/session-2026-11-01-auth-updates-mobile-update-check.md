# Session 2026-11-01 — Dual Auth, Schema Validation, Mobile Update Check

> Covers work done on **2026-11-01** across **web-erp**, **erp-client**, **erp-app**, and **core-apis**.

---

## 1. Dual Authentication — Previous Session Continuation

Dual auth (Email + Password **or** Email + OTP for both sign-up and sign-in) was implemented across web-erp and erp-client in the prior session. PRs were open at session start.

### Status at session start

| Repo | Branch | PR | Status |
|---|---|---|---|
| web-erp | `feat/dual-auth-otp` | #9 | Open — awaiting merge |
| erp-client | `feat/dual-auth-otp` | #127 | Open — awaiting merge |
| erp-app | No code change needed | — | Clerk Dashboard config sufficient |
| core-apis | No change needed | — | JWT verification is auth-method agnostic |

### Key implementation details (web-erp `Step1Account.tsx` on main)

- `authMethod: 'password' | 'otp'` state controls which sign-up/sign-in path runs
- OTP sign-in: `signIn.create({ strategy: 'email_code', identifier })` → `attemptFirstFactor`
- OTP sign-up: `signUp.create({ emailAddress })` → `prepareEmailAddressVerification`
- `verificationStrategy: 'first_factor' | 'second_factor'` distinguishes OTP sign-in from MFA after password sign-in
- `handleVerify` branches on both `verificationKind` AND `verificationStrategy`
- TypeScript fix: `let verification: { status: string | null; createdSessionId: string | null }` — required because `attemptFirstFactor` and `attemptEmailAddressVerification` return different Clerk types
- Auth CSS classes (`auth-method-toggle`, `auth-method-tab--active`, `btn-link`, `form-submit-error`, `verification-copy`, `onboarding-loading`) added to `src/index.css`
- First name / last name / username removed from both password and OTP sign-up paths across all frontends

---

## 2. `feat/web-ux-refresh` Branch Review (web-erp)

Branch authored by Hitarth92 on 2026-10-24 — before the dual-auth work. PR #2.

### Verdict: closed without merge

**Valuable changes identified (not merged due to conflicts):**

| File | Change | Notes |
|---|---|---|
| `vite.config.ts` | Manual code-splitting — Clerk, framer-motion, React vendors into separate chunks | Build performance |
| `Step7Pricing.tsx` | USD $49/$39 → KES 4,999/3,999 | Critical for Kenyan market — worth a targeted follow-up PR |
| `OnboardingContext.tsx` | Password excluded from localStorage; storage key renamed to `pramukh_onboarding_draft`; default country = Kenya | Security + UX |
| `LandingPage`, `Dashboard`, `DownloadsPage`, Steps 2–8, `StepLayout`, `ProgressBar`, `ERPDashboardPreview`, `Input`, `Select` | UI/UX improvements | All clean |

**Conflicts (reason for closing):**

| File | Problem |
|---|---|
| `Step1Account.tsx` | Branch version still has firstName/lastName, no OTP — incompatible with auth work on main |
| `index.css` | Major overhaul would silently drop all auth-step CSS added to main |

**Action:** PR #2 closed with explanation comment. KES pricing fix flagged for a separate targeted PR.

---

## 3. Core-APIs Develop Branch — Schema Migration Validation

Migration `1793471994287` on the `develop` branch adds 6 nullable columns to `core.organizations`:

```sql
ALTER TABLE "core"."organizations" ADD "industry" character varying(100);
ALTER TABLE "core"."organizations" ADD "business_type" character varying(50);
ALTER TABLE "core"."organizations" ADD "team_size" character varying(20);
ALTER TABLE "core"."organizations" ADD "modules" jsonb;
ALTER TABLE "core"."organizations" ADD "sales_method" character varying(50);
ALTER TABLE "core"."organizations" ADD "tax_id" character varying(100);
```

`OnboardOrganizationRequest` was updated in the same develop branch to accept all six fields (all optional).

### web-erp form status: no changes required

Verified the entire data path:

| Layer | File | Status |
|---|---|---|
| Form (Steps 2–6) | `Step2OrgSetup.tsx` through `Step6HowYouSell.tsx` | All six fields already collected |
| Context | `OnboardingContext.tsx` | All fields in `OnboardingData` type and `defaultData` |
| API call | `Step7Pricing.tsx:113–127` | All six fields already passed to `onboardOrganization()` |
| API client | `authApi.ts:65–79` | `OnboardOrganizationInput` interface already declares all fields |

Before this migration, the frontend was submitting these fields correctly but the DB columns did not exist — data was silently discarded. After the migration runs, the full onboarding payload will be persisted end-to-end.

**No frontend changes were made or required.**

---

## 4. erp-app — In-App Update Check (PR #6)

### Problem

`mobile-release.service.ts` exposes a single "latest" APK via S3 — always the most recent build. Users on older APKs had no in-app mechanism to discover a new version existed; they would only find out by visiting the web-erp Downloads page manually.

### Solution

Three files added/modified. No new dependencies — `expo-application` and `expo-linking` were already installed.

#### `src/api/releases.api.ts` (new)

Unauthenticated API module calling the two public mobile-releases endpoints:
- `getLatestRelease()` → `GET /api/v1/mobile-releases/latest` — returns metadata including `buildNumber`
- `createReleaseDownloadUrl()` → `POST /api/v1/mobile-releases/latest/download` — returns a fresh 5-minute signed S3 URL

Uses a plain `axios` instance (not `apiClient`) so it works before Clerk/auth is configured.

#### `src/components/UpdateRequired.tsx` (new)

Full-screen, non-dismissable blocker component. Displays the available version and a "Download Update" button. On press: calls `createReleaseDownloadUrl()` and opens the signed URL with `Linking.openURL()` — triggers APK download in the device browser. Network errors on the download call show an inline error message; the screen stays open.

#### `app/_layout.tsx` (modified)

Added to `RootNavigator` on mount:
1. Call `getLatestRelease()`
2. Compare `parseInt(latest.buildNumber, 10)` against `parseInt(Application.nativeBuildVersion, 10)`
3. If API build number is higher → set `latestRelease` state → render `<UpdateRequired>` before any other screen
4. Any exception (network offline, no release published, API down) → silently ignored, app proceeds normally

The update check renders **before** the Clerk loading spinner and before any navigation — ensures the user cannot proceed on an outdated build.

### Behaviour

- User on build N, latest is build N+2 → blocker shown immediately, user downloads build N+2 directly (no intermediate step)
- User offline → no blocker, app loads normally
- No release published in S3 → 404 → no blocker, app loads normally

### PR

`feat/in-app-update-check` → **erp-app PR #6** — base: `main`

---

## 5. Branch Protection (carried over from previous session)

GitHub Rulesets applied to `main` in all three repos:
- Require 1 approving review before merge
- Dismiss stale reviews on push
- Block force-push and deletion
- Bypass actor: ParthRaj27 (GitHub ID 139099238) — always bypass

---

## Open Items

| Item | Repo | Notes |
|---|---|---|
| Merge PR #9 | web-erp | Dual auth + name field removal + auth CSS |
| Merge PR #127 | erp-client | Dual auth + name field removal |
| Merge PR #6 | erp-app | In-app update check |
| KES pricing fix | web-erp | Raise targeted PR cherry-picking `Step7Pricing.tsx` from `feat/web-ux-refresh` |
| Run `migration:up` for `1793471994287` | core-apis | After develop is merged to main |
