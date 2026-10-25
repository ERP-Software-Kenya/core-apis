import { AccountType } from './accounting.types';

export const OFFICIAL_ACCOUNT_CODES = {
  Cash: '1000',
  Bank: '1010',
  AccountsReceivable: '1100',
  SupplierAdvances: '1150',
  Inventory: '1200',
  AccountsPayable: '2000',
  TaxPayable: '2100',
  OwnerEquity: '3000',
  SalesRevenue: '4000',
  OtherIncome: '4100',
  CostOfGoodsSold: '5000',
  OperatingExpense: '5100',
  SalesDiscount: '5200',
  AdjustmentExpense: '5300',
} as const;

export const BLACK_LEDGER_ACCOUNT_CODES = {
  Cash: 'B100',
  Bank: 'B101',
  Receivable: 'B110',
  SupplierAdvances: 'B115',
  Inventory: 'B120',
  Payable: 'B200',
  CommissionPayable: 'B210',
  SalesRevenue: 'B400',
  CostOfGoodsSold: 'B500',
  CommissionExpense: 'B510',
} as const;

export const DEFAULT_OFFICIAL_ACCOUNTS = [
  [OFFICIAL_ACCOUNT_CODES.Cash, 'Cash', AccountType.Asset],
  [OFFICIAL_ACCOUNT_CODES.Bank, 'Bank', AccountType.Asset],
  [OFFICIAL_ACCOUNT_CODES.AccountsReceivable, 'Accounts Receivable', AccountType.Asset],
  [OFFICIAL_ACCOUNT_CODES.SupplierAdvances, 'Supplier Advances', AccountType.Asset],
  [OFFICIAL_ACCOUNT_CODES.Inventory, 'Inventory', AccountType.Asset],
  [OFFICIAL_ACCOUNT_CODES.AccountsPayable, 'Accounts Payable', AccountType.Liability],
  [OFFICIAL_ACCOUNT_CODES.TaxPayable, 'Tax Payable', AccountType.Liability],
  [OFFICIAL_ACCOUNT_CODES.OwnerEquity, 'Owner Equity', AccountType.Equity],
  [OFFICIAL_ACCOUNT_CODES.SalesRevenue, 'Sales Revenue', AccountType.Revenue],
  [OFFICIAL_ACCOUNT_CODES.OtherIncome, 'Other Income', AccountType.Revenue],
  [OFFICIAL_ACCOUNT_CODES.CostOfGoodsSold, 'Cost of Goods Sold', AccountType.Expense],
  [OFFICIAL_ACCOUNT_CODES.OperatingExpense, 'Operating Expense', AccountType.Expense],
  [OFFICIAL_ACCOUNT_CODES.SalesDiscount, 'Sales Discounts', AccountType.Expense],
  [OFFICIAL_ACCOUNT_CODES.AdjustmentExpense, 'Adjustment Expense', AccountType.Expense],
] as const;

export const DEFAULT_BLACK_LEDGER_ACCOUNTS = [
  [BLACK_LEDGER_ACCOUNT_CODES.Cash, 'Black Cash', AccountType.Asset],
  [BLACK_LEDGER_ACCOUNT_CODES.Bank, 'Black Bank', AccountType.Asset],
  [BLACK_LEDGER_ACCOUNT_CODES.Receivable, 'Black Receivable', AccountType.Asset],
  [BLACK_LEDGER_ACCOUNT_CODES.SupplierAdvances, 'Black Supplier Advances', AccountType.Asset],
  [BLACK_LEDGER_ACCOUNT_CODES.Inventory, 'Black Inventory', AccountType.Asset],
  [BLACK_LEDGER_ACCOUNT_CODES.Payable, 'Black Payable', AccountType.Liability],
  [BLACK_LEDGER_ACCOUNT_CODES.CommissionPayable, 'Black Commission Payable', AccountType.Liability],
  [BLACK_LEDGER_ACCOUNT_CODES.SalesRevenue, 'Black Sales Revenue', AccountType.Revenue],
  [BLACK_LEDGER_ACCOUNT_CODES.CostOfGoodsSold, 'Black Cost of Goods Sold', AccountType.Expense],
  [BLACK_LEDGER_ACCOUNT_CODES.CommissionExpense, 'Black Commission Expense', AccountType.Expense],
] as const;

export function fiscalPeriodContaining(date: Date, startMonth: number): { startsOn: string; endsOn: string } {
  const month = date.getUTCMonth() + 1;
  const startYear = month >= startMonth ? date.getUTCFullYear() : date.getUTCFullYear() - 1;
  const start = new Date(Date.UTC(startYear, startMonth - 1, 1));
  const end = new Date(Date.UTC(startYear + 1, startMonth - 1, 0));
  return {
    startsOn: start.toISOString().slice(0, 10),
    endsOn: end.toISOString().slice(0, 10),
  };
}
