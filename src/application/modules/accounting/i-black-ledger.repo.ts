import { PostBlackLedgerJournalInput, PostedBlackLedgerJournal } from './accounting.types';

/** Isolated off-ledger bookkeeping. Its data must never be joined into official financial reports. */
export interface IBlackLedgerRepo {
  postJournal(input: PostBlackLedgerJournalInput): Promise<PostedBlackLedgerJournal>;
}
