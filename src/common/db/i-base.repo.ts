import { Filter, PageableFilter } from "../filtering";
import { IReadOnlyRepo } from './i-read-only.repo';
import { ITransactional } from "./i-transactional";

export interface IBaseRepo<T, TKey, TPageableFilter = PageableFilter<T, TKey>, TFilter = Filter<T, TKey>> extends IReadOnlyRepo<T, TKey, TPageableFilter, TFilter> {
  get transaction(): ITransactional;
  createAsync(entry: T): Promise<T>;
  updateAsync(entry: T): Promise<T>;
  deleteAsync(pk: TKey, force?: boolean): Promise<boolean>;
}
