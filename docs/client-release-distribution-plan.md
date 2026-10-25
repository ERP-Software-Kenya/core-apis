# Client Release and Web-ERP Distribution Plan

## Decision

Yes. Web-ERP can provide an authenticated **Downloads / Releases** page for `erp-app` mobile builds. The Electron desktop client is explicitly outside this release system's scope.

Use this separation:

- GitHub Actions / EAS builds and signs `erp-app`.
- Private R2/S3-compatible object storage stores approved artifacts.
- Core APIs stores release metadata, enforces RBAC, creates short-lived download URLs, and audits downloads.
- Web-ERP lists approved mobile releases and starts downloads through Core APIs.
- Render/EC2 deploys the web/API services; it must not be the permanent artifact store.

Render filesystems are ephemeral by default, while the backend already has R2/S3 storage and presigned URL support. Keeping binaries outside the web process also makes rollback and retention predictable.

## Repository evidence

- `core-apis/.github/workflows/deploy.yml`: builds a versioned backend container, runs migrations, then deploys it to EC2.
- `core-apis/src/common/file-storage/r2-file.storage.ts`: supports private objects and presigned GET/PUT URLs.
- `erp-app/eas.json`: already has development, internal preview, and production profiles.
- `erp-app/app.json`: defines the Android/iOS application identifiers and the `erpapp` deep-link scheme.
- `Web-ERP/package.json`: Web-ERP is a Vite/React application and can host the authenticated releases UI.

The ChainIT fleet MCP gateway requested by `AGENTS.md` was not available in this session. Cross-repository conclusions above therefore come from the four local checkouts and should be revalidated through ChainIT before implementation changes.

## Target architecture

```text
Version tag / manual dispatch
            |
            v
 GitHub Actions and EAS Build
   - test and build
   - sign artifact
   - calculate SHA-256
   - create SBOM / scan
            |
            v
 Private R2 artifact bucket
            |
            v
 Core APIs release record (draft)
            |
       admin approval
            |
            v
 Web-ERP Downloads page
            |
 authenticated download request
            |
            v
 5-minute signed URL + audit event
```

Do not put permanent public artifact URLs in the frontend or database. Store the private object key and generate a new signed URL for each authorized download.

## Supported delivery paths

| Client | Web-ERP download | Production recommendation |
|---|---|---|
| Android warehouse/driver | Signed `.apk` from the internal profile | Direct download is suitable for managed/internal devices; use Play Store/AAB for broad public distribution |
| iOS warehouse/driver | Do not treat an IPA like an APK | TestFlight, Apple Business Manager/MDM, or properly provisioned ad hoc/enterprise distribution |
| Expo JS/assets update | No installer download | EAS Update only for changes compatible with the installed native runtime |

Android production builds normally produce an AAB, which cannot be installed directly. The downloadable channel must explicitly generate an APK. iOS ad hoc builds only install on registered devices, unless the organization qualifies for enterprise/managed distribution.

## Release data model

### `client_releases`

- `id` UUID
- `application`: fixed to `mobile` initially, retained for schema evolution
- `platform`: `android` or `ios`
- `architecture`: for example `x64`, `arm64`, or `universal`
- `channel`: `internal`, `staging`, `stable`
- `version` and immutable `build_number`
- `status`: `draft`, `published`, `withdrawn`
- `storage_key`, `file_name`, `content_type`, `size_bytes`
- `sha256`
- `release_notes`
- `minimum_supported_version`
- `mandatory` boolean
- `rollout_percentage`
- `git_commit`, `build_provider`, `external_build_id`
- `created_by`, `approved_by`, `published_at`, timestamps

Enforce a unique key on application, platform, channel, version, and build number. Published rows and artifacts are immutable; corrections require a new build.

### `client_release_downloads`

- `id`, `release_id`, `user_id`, `organization_id`
- `device_session_id` when known
- `ip_address`, `user_agent`
- `downloaded_at`

This table records that access was granted. Object-storage access logs may additionally confirm transfer completion.

## Core APIs contract

Authenticated user endpoints:

- `GET /api/v1/client-releases?application=&platform=&channel=`
- `GET /api/v1/client-releases/latest?application=&platform=&channel=`
- `POST /api/v1/client-releases/:id/download` returns a short-lived signed URL and records the audit event.

Super-admin endpoints:

- `POST /api/v1/admin/client-releases` creates a draft from CI-provided metadata.
- `POST /api/v1/admin/client-releases/:id/publish`
- `POST /api/v1/admin/client-releases/:id/withdraw`

Rules:

- Only `SUPER_ADMIN` can create, publish, or withdraw global builds.
- Authenticated active accounts can download published builds allowed for their organization and role.
- A withdrawn release never produces a new signed URL.
- Download links expire after about five minutes, not the current generic seven-day storage default.
- Rate-limit download URL generation and log all publish/withdraw actions.
- CI uses a dedicated machine credential with only draft-create/artifact-upload permission; it cannot publish.

## Web-ERP experience

Add **Settings > Downloads** with:

- latest approved Android and iOS release cards;
- platform, version, build number, file size, published date, and release notes;
- SHA-256 with a copy action;
- primary Download button and release history;
- clear labels for stable/internal channels;
- withdrawn/unsupported builds hidden from normal users;
- a Super Admin release-management view for draft approval and withdrawal.

The download button first calls Core APIs. Web-ERP then navigates to the returned signed URL. It must not cache signed URLs.

## Automated release workflow

1. Create a semantic version tag such as `mobile-v1.2.0`.
2. CI checks formatting, types, tests, and dependency/security policy.
3. Build the signed installer:
   - Android internal: EAS `distribution: internal` with `android.buildType: apk`.
   - Mobile store: EAS production AAB/IPA and store submission workflow.
4. Generate SHA-256, SBOM, build provenance, and release notes.
5. Upload artifacts to a versioned private bucket path such as `releases/mobile/android/stable/1.2.0/42/erp-app.apk`.
6. CI creates a draft release through Core APIs.
7. A Super Admin validates the candidate and publishes it.
8. Start with a small rollout, monitor errors, then increase to 100%.
9. Roll back by withdrawing the bad release and republishing the prior approved version as latest. Never replace an existing binary in place.

## Mobile update policy

- Configure EAS channels (`staging`, `production`) and a `runtimeVersion` policy.
- EAS Update may deliver JavaScript/assets without disturbing active users when native compatibility is unchanged.
- Any native dependency, permission, plugin, or native app configuration change requires a new binary.
- Prompt for installer updates at a safe point; do not interrupt an active delivery, packing operation, or unsynced offline work.
- `mandatory=true` should be reserved for security fixes or incompatible API versions and should still allow current work to sync before blocking.

## Security and production gates

- Sign mobile binaries using protected CI credentials.
- Keep the artifact bucket private, versioned, encrypted, and covered by retention/backups.
- Verify uploaded artifact size and SHA-256 before draft creation.
- Scan artifacts and dependencies; attach an SBOM and build provenance.
- Require environment approval for stable publication.
- Prevent version downgrade unless a Super Admin explicitly performs a rollback.
- Never expose EAS, GitHub, R2, or signing credentials to Web-ERP.
- Set retention rules: keep all stable releases and a defined number of staging/internal releases.

## Delivery phases

### Phase 1 — release foundation

- Add database migration/entities, release module, RBAC, audit events, tests, and private artifact paths.
- Add CI draft-registration and checksum generation.

### Phase 2 — Web-ERP portal

- Add Downloads page and Super Admin management UI.
- Add download/history API client hooks and empty/error/loading states.

### Phase 3 — mobile automation

- Add explicit staging/stable channels, APK internal profile, runtime versioning, and store builds.
- Add a non-disruptive in-app update check.

### Phase 4 — operational hardening

- Staged rollout, monitoring, withdrawal/rollback drill, storage retention, and release runbook.

## Acceptance checklist

- An unauthorized or inactive user cannot list or download releases.
- An Org Admin can download published builds but cannot publish them.
- Only a Super Admin can publish or withdraw a global release.
- Every download uses a newly generated short-lived URL and creates an audit row.
- A withdrawn release stops producing URLs immediately.
- APK installs successfully on clean managed Android devices.
- Expo compatible OTA updates preserve active user sessions.
- Offline/unsynced fleet work is not lost during update prompts.
- Previous stable versions remain available for controlled rollback.
- The release can be traced to commit, CI run, signer, checksum, approver, and publication time.

## Recommended first implementation slice

Implement Android internal downloads first because they directly support warehouse and driver devices. Keep iOS routed through TestFlight/managed Apple distribution, and add public store delivery only when required.

## Web-ERP download page status

Implemented on the Web-ERP `/downloads` page:

- responsive Android mobile-app release card and device presentation;
- APK version, channel, size, publication date, and optional SHA-256 display;
- Android installation instructions and update-signing guidance;
- safe disabled state until an HTTPS artifact URL is configured;
- existing desktop downloads remain available below the mobile release;
- header download actions now open the unified downloads page.

Web-ERP production variables:

- `VITE_ANDROID_APP_DOWNLOAD_URL`
- `VITE_ANDROID_APP_VERSION`
- `VITE_ANDROID_APP_SIZE`
- `VITE_ANDROID_APP_UPDATED_AT`
- `VITE_ANDROID_APP_SHA256` (optional)
- `VITE_MOBILE_RELEASE_CHANNEL`

The download URL must be a public R2/custom-domain object URL or a Core APIs endpoint that redirects to a short-lived signed URL. R2 credentials must never be supplied through a `VITE_*` variable.

### Main-branch Android automation

`erp-app/.github/workflows/release-android.yml` runs after a push/merge to `main` and can also be dispatched manually. It:

1. runs TypeScript validation;
2. creates a signed APK with the EAS `release-apk` profile;
3. downloads the completed EAS artifact;
4. calculates SHA-256 and release metadata;
5. uploads an immutable version/build path to Backblaze B2;
6. refreshes `latest/erp-app.apk` and `latest.json`;
7. lets Web-ERP discover the current build from `VITE_ANDROID_RELEASE_MANIFEST_URL`.

Required `erp-app` GitHub Actions secrets:

- `EXPO_TOKEN`
- `B2_ACCESS_KEY_ID`
- `B2_SECRET_ACCESS_KEY`

Required `erp-app` GitHub Actions variables:

- `B2_ENDPOINT`, for example `https://s3.us-west-004.backblazeb2.com`
- `B2_REGION`, for example `us-west-004`
- `B2_BUCKET`
- `B2_PUBLIC_BASE_URL`, including the bucket/public delivery prefix but no trailing slash

The EAS project must be linked once (`eas init`), Android signing credentials must be configured, and the EAS `production` environment must contain the mobile application's public runtime configuration. The Backblaze release bucket must permit public reads for the Web-ERP direct-download model; otherwise, a Core APIs signed-download endpoint is required.

## External references

- Expo: [Build APKs for Android devices](https://docs.expo.dev/build-reference/apk/)
- Expo: [Internal distribution](https://docs.expo.dev/build/internal-distribution/)
- Expo: [Runtime versions and update compatibility](https://docs.expo.dev/eas-update/runtime-versions/)
- Render: [Persistent disks and ephemeral filesystems](https://render.com/docs/disks)
