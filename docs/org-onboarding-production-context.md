# Organization Onboarding — Production Context

> Covers the full production-grade onboarding implementation across **core-apis**, **web-erp**, and **erp-client**.
> Branch: `feat/production-org-onboarding` in all three repos.
> PRs: core-apis #230 · web-erp #7 · erp-client #125

---

## 1. Problem Statement

The existing onboarding flow collected data across 6 web-erp steps but only persisted 4 fields (`name`, `slug`, `clerkOrgId`, `country`). All other collected data (industry, business type, team size, modules, sales method, tax ID) was silently discarded. `organization_settings` (currency, timezone, fiscal year) was never initialized during onboarding — it always defaulted to USD / UTC / January regardless of the organization's country.

---

## 2. Onboarding Flow (End-to-End)

### Platform split
| Platform | Role |
|---|---|
| **web-erp** (`erp-web-kenya.netlify.app`) | Sole entry point for org creation and onboarding |
| **erp-client** (Electron desktop) | Sign-in only — "Create Organization" link redirects to web-erp |
| **erp-app** (mobile) | Not involved in onboarding |

### web-erp step sequence
| Step | What is collected |
|---|---|
| Step 1 | Clerk account creation (email + password) |
| Step 2 | Org name, industry, country → auto-fills currency / timezone / fiscal year; Tax ID (optional), base currency, timezone, fiscal year start month |
| Step 3 | Business type (`B2B` / `B2C` / `Both`) |
| Step 4 | Team size |
| Step 5 | Modules selected (jsonb array: `inventory`, `pos`, `fleet`, `locations`, etc.) |
| Step 6 | Sales method |
| Step 7 | Plan selection → triggers `POST /api/v1/auth/onboard-organization` with all collected data |
| Step 8 | Done screen |

### Backend handler (5-step transaction)
```
Step 1 — org.createAsync({ name, slug, clerkOrgId, country, industry, businessType,
                            teamSize, modules, salesMethod, taxId, isActive: true })
Step 2 — roleRepo.allAsync() → find ERole.OrgAdmin ('org_admin')
Step 3 — userRepo.updateAsync({ ...user, organizationId: org.id })
Step 4 — orgMemberRepo.createAsync({ organizationId, userId, roleId: orgAdminRole.id,
                                      status: 'active', joinedAt: new Date() })
Step 5 — orgSettingRepo.getOrCreateAsync(org.id)
          → updateSettingsAsync({ baseCurrencyCode, timeZone, fiscalYearStartMonth })
            if any of the three is provided
```

Rollback on failure: reverses in reverse-step order (settings cascade-delete with org; membership cascade-deletes with org).

---

## 3. Backend Changes (`core-apis`)

### 3.1 Entity — `organization.entity.ts`

Six nullable columns added after `country`:

```typescript
@Column({ type: 'varchar', length: 100, nullable: true }) industry?: string;
@Column({ type: 'varchar', length: 50,  nullable: true }) businessType?: string;
@Column({ type: 'varchar', length: 20,  nullable: true }) teamSize?: string;
@Column({ type: 'jsonb',                nullable: true }) modules?: string[];
@Column({ type: 'varchar', length: 50,  nullable: true }) salesMethod?: string;
@Column({ type: 'varchar', length: 100, nullable: true }) taxId?: string;
```

`modules` uses `@AutoMap(() => [String])` everywhere (entity, domain model, command, request DTO).

### 3.2 Domain model — `organization.model.ts`

Six matching `@AutoMap()` fields added.

### 3.3 Request DTO — `onboard-organization.request.ts`

Nine new optional fields:

```typescript
@IsOptional() @IsString() industry?: string;
@IsOptional() @IsString() businessType?: string;
@IsOptional() @IsString() teamSize?: string;
@IsOptional() @IsArray() @IsString({ each: true }) modules?: string[];
@IsOptional() @IsString() salesMethod?: string;
@IsOptional() @IsString() taxId?: string;
@IsOptional() @IsString() baseCurrencyCode?: string;
@IsOptional() @IsString() timeZone?: string;
@IsOptional() @IsInt() @Min(1) @Max(12) fiscalYearStartMonth?: number;
```

### 3.4 Command — `onboard-organization.command.ts`

Nine matching `@AutoMap()` fields mirroring the request DTO.

### 3.5 Controller — `auth.controller.ts`

`onboardOrganization()` maps all 9 new fields from body to command.

### 3.6 Command handler — `onboard-organization.command-handler.ts`

Key injections:
```typescript
@Inject(ORGANIZATION_SETTING_REPO) private readonly orgSettingRepo: IOrganizationSettingRepo
```

Step 5 logic:
```typescript
const orgSetting = await this.orgSettingRepo.getOrCreateAsync(org.id);
if (command.baseCurrencyCode || command.timeZone || command.fiscalYearStartMonth) {
  await this.orgSettingRepo.updateSettingsAsync({
    organizationId: org.id,
    baseCurrencyCode: command.baseCurrencyCode ?? orgSetting.baseCurrencyCode,
    timeZone:         command.timeZone         ?? orgSetting.timeZone,
    fiscalYearStartMonth: command.fiscalYearStartMonth ?? orgSetting.fiscalYearStartMonth,
  });
}
```

### 3.7 Migration — `1793471994287-migration.ts`

Generated via `npm run migration:generate`. Adds the 6 new nullable columns to `core.organizations`.
Registered in `src/infrastructure/persistence/migrations/index.ts`.

### 3.8 Org Admin verification

`ERole.OrgAdmin = 'org_admin'` — confirmed matches frontend check `result.role !== 'org_admin'`.
The handler throws if the OrgAdmin role seed is missing from the DB.

---

## 4. Frontend Changes (`web-erp`)

### 4.1 `src/types/index.ts`

`OnboardingData` extended with four new fields:
```typescript
taxId: string;
baseCurrencyCode: string;
timeZone: string;
fiscalYearStartMonth: number;
```

### 4.2 `src/features/onboarding/context/OnboardingContext.tsx`

New field defaults:
```typescript
taxId: '', baseCurrencyCode: 'USD', timeZone: 'UTC', fiscalYearStartMonth: 1
```

### 4.3 `src/features/onboarding/steps/Step2OrgSetup.tsx`

Country selection auto-fills currency / timezone / fiscal year via `COUNTRY_DEFAULTS`:

| Country | Currency | Timezone | Fiscal start |
|---|---|---|---|
| Kenya | KES | Africa/Nairobi | July |
| Uganda | UGX | Africa/Kampala | July |
| Tanzania | TZS | Africa/Dar_es_Salaam | July |
| Ethiopia | ETB | Africa/Addis_Ababa | July |
| Rwanda | RWF | Africa/Kigali | July |
| Ghana | GHS | Africa/Accra | January |
| Nigeria | NGN | Africa/Lagos | January |
| South Africa | ZAR | Africa/Johannesburg | April |
| India | INR | Asia/Kolkata | April |
| United Kingdom | GBP | Europe/London | April |
| United States | USD | America/New_York | January |
| Other | USD | UTC | January |

Additional UI fields rendered below country: Tax ID (optional text input), Base Currency (select), Timezone (select), Fiscal Year Starts In (month select).

Helper hint shown after country is selected: "Currency, timezone, and fiscal year are auto-filled from your country — you can change these."

### 4.4 `src/features/auth/services/authApi.ts`

`OnboardOrganizationInput` interface with 13 fields. Empty strings, `undefined`, and empty arrays are stripped before the POST body is built:
```typescript
for (const [key, value] of Object.entries(input)) {
  if (value === '' || value === undefined) continue;
  if (Array.isArray(value) && value.length === 0) continue;
  body[key] = value;
}
```

### 4.5 `src/features/onboarding/steps/Step7Pricing.tsx`

`onboardOrganization()` called with all 10 additional fields (`|| undefined` normalization) on plan selection.

---

## 5. Desktop Client Changes (`erp-client`)

### 5.1 `renderer/.env.example`

```
VITE_WEB_ERP_URL=https://erp-web-kenya.netlify.app
```

### 5.2 `renderer/src/pages/SignIn/index.tsx`

"Sign up" link replaced with an external anchor:
```tsx
<p className="text-center text-sm text-muted-foreground">
  New organization?{' '}
  <a
    href={import.meta.env.VITE_WEB_ERP_URL ?? 'https://erp-web-kenya.netlify.app'}
    target="_blank"
    rel="noreferrer"
    className="text-primary underline underline-offset-2"
  >
    Create Organization
  </a>
</p>
```

`/signup` route in `App.tsx` left intact (not removed).

---

## 6. Infrastructure & Deployment

### Clerk `AUTHORIZED_PARTIES`

Must include the web-erp origin so Clerk validates JWTs from the browser onboarding flow:

```
CLERK_AUTHORIZED_PARTIES=http://localhost:5173,http://127.0.0.1:47821,https://erp-web-kenya.netlify.app,pramukh://renderer
```

- `http://localhost:5173` — web-erp dev server (Vite)
- `http://127.0.0.1:47821` — Electron dev renderer
- `https://erp-web-kenya.netlify.app` — web-erp production (Netlify)
- `pramukh://renderer` — Electron production custom scheme

**Action required on EC2:** Update `~/Core-ERP/core-apis/.env` and restart the container. The GitHub Actions deploy workflow reads `--env-file ~/Core-ERP/core-apis/.env` directly — no workflow changes needed.

### Deployment pipeline (`core-apis`)

1. Push to `main` → `build` job builds + pushes Docker image to GHCR
2. `apply-migrations` job SSHs to EC2, runs migration via `node -e "ds.runMigrations()"`
3. `deploy` job SSHs to EC2, restarts `docker compose -f docker-compose.development.yml`

Migration `1793471994287` will be applied automatically on next deploy to `main`.

---

## 7. Organization Settings Table

`core.organization_settings` — one row per org, created/fetched in Step 5 of onboarding.

| Column | Default | Set at onboarding |
|---|---|---|
| `base_currency_code` | `USD` | from Step 2 country auto-fill (overridable) |
| `time_zone` | `UTC` | from Step 2 country auto-fill (overridable) |
| `fiscal_year_start_month` | `1` (January) | from Step 2 country auto-fill (overridable) |

Settings cascade-delete when the org row is deleted — no extra rollback step needed.

---

## 8. Data Stored per Organization (Post-Onboarding)

### `core.organizations`
`name`, `slug`, `clerk_org_id`, `logo_url`, `country`, `industry`, `business_type`, `team_size`, `modules` (jsonb), `sales_method`, `tax_id`, `is_active`

### `core.organization_settings`
`organization_id` (FK, cascade), `base_currency_code`, `time_zone`, `fiscal_year_start_month`

### `core.users`
`organization_id` linked after Step 3

### `core.org_members`
`{ organization_id, user_id, role_id → OrgAdmin, status: 'active', joined_at }`

---

## 9. PRs

| Repo | PR | Target | Description |
|---|---|---|---|
| core-apis | [#230](https://github.com/ERP-Software-Kenya/core-apis/pull/230) | `develop` | Backend schema + handler + migration |
| web-erp | [#7](https://github.com/ERP-Software-Kenya/Web-ERP/pull/7) | `main` | Full onboarding data collection + submission |
| erp-client | [#125](https://github.com/ERP-Software-Kenya/ERP-Client/pull/125) | `main` | Create Organization redirect, VITE_WEB_ERP_URL |
