export interface IQldbLedgerOptions {
  ledgerName: string;
  tableName: string;
  region: string;
  maxConcurrentTransactions: number;
  retryLimit: number;
}
