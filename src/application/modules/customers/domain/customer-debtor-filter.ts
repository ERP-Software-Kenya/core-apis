export const CUSTOMER_DEBTOR_FILTERS = ['any', 'with-dues', 'over-limit'] as const;
export type CustomerDebtorFilter = (typeof CUSTOMER_DEBTOR_FILTERS)[number];
