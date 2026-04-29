import { IRecordHistory } from "./types";

export interface IImmutableRepo<T, TKey> {
  getAsync(pk: TKey): Promise<T>;
  getHistoryAsync(pk: TKey): Promise<IRecordHistory<T>[]>;
  createAsync(entry: T): Promise<T>;
  updateAsync(entry: T): Promise<T>;
  deleteAsync(pk: TKey): Promise<boolean>;
}
