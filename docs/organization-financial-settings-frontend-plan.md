# Organization Financial Settings — Frontend Integration Plan

## Backend contract

Base path: `/api/v1/billing-settings/organization`

- `GET` returns the current organization's settings. The backend creates defaults when no row exists.
- `PATCH` is restricted to `OrgAdmin` and `SuperAdmin`.
- Tenant identity always comes from the authenticated session; the client must never send an organization ID.

```ts
interface OrganizationFinancialSettings {
  id: string;
  organizationId: string;
  baseCurrencyCode: string;      // ISO 4217, default USD
  fiscalYearStartMonth: number;  // 1..12, default 4 (April)
  timeZone: string;              // IANA identifier, default UTC
  updatedAt: string;
}
```

PATCH body:

```json
{
  "baseCurrencyCode": "USD",
  "fiscalYearStartMonth": 4,
  "timeZone": "Asia/Kolkata"
}
```

## Settings page

Add an **Organization > Financial & Regional** section containing:

1. Searchable currency selector populated from the existing currency reference API.
2. Fiscal-year start-month selector showing month names while sending numbers `1..12`.
3. IANA time-zone selector.
4. Save button with dirty-state tracking and server validation errors.

The UI should explain that base currency and fiscal-year start cannot change after the first financial journal is posted. Time zone may still change because it affects presentation and future date interpretation, not posted monetary values.

## Shared frontend behavior

- Load these settings into organization-scoped application state after authentication.
- Format monetary values using `Intl.NumberFormat` with `baseCurrencyCode`; do not hard-code `$`, `₹`, or decimal digits.
- Format business dates using `timeZone`.
- Use `fiscalYearStartMonth` in financial-report date presets.
- Clear cached settings when the active organization changes.
- Do not apply these settings to the isolated black ledger in official financial reports; black-ledger screens may reuse currency formatting only.

## Error handling

- `400`: invalid/unsupported currency, month, or time zone—show the returned field message.
- `401/403`: hide editing controls and follow the normal session/permissions flow.
- `409`: journals already exist—reload settings and display the server explanation.
