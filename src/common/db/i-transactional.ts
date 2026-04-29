export interface ITransactional {
  startAsync(isolation?: string): Promise<void>;
  commitAsync(): Promise<void>;
  rollbackAsync(): Promise<void>;
}