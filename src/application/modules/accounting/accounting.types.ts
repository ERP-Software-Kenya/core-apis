export enum AccountType {
  Asset = 'asset',
  Liability = 'liability',
  Equity = 'equity',
  Revenue = 'revenue',
  Expense = 'expense',
}

export enum AccountingPeriodStatus {
  Open = 'open',
  Closed = 'closed',
}

export enum JournalEntryStatus {
  Posted = 'posted',
  Reversed = 'reversed',
}

export interface JournalLineInput {
  accountId: string;
  debit: string | number;
  credit: string | number;
  description?: string;
  branchId?: string;
  locationId?: string;
  customerId?: string;
  supplierId?: string;
}

export interface PostJournalInput {
  organizationId: string;
  idempotencyKey: string;
  sourceType: string;
  sourceId: string;
  occurredAt: Date;
  description: string;
  createdBy: string;
  lines: JournalLineInput[];
}

export interface PostedJournal {
  id: string;
  entryNumber: number;
  idempotencyKey: string;
}

export type BlackLedgerLineInput = JournalLineInput;
export type PostBlackLedgerJournalInput = PostJournalInput;
export type PostedBlackLedgerJournal = PostedJournal;
