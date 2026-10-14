import { PostJournalInput, PostedJournal } from './accounting.types';

export interface IAccountingRepo {
  postJournal(input: PostJournalInput): Promise<PostedJournal>;
}
