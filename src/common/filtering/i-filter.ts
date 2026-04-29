import { EOrder } from '..';

export interface IFilterBase<TId = string> {
  $ids?: TId[];
  $orderBy?: string;
  $order?: EOrder;
  userType?: string;
}

export interface IPageableFilterBase<TId = string> extends IFilterBase<TId> {
  $page?: number;
  $perPage?: number;
  $resolveImages?: boolean;
}

export type Filter<T, TId = string> = Partial<T & IFilterBase<TId>>;
export type PageableFilter<T, TId = string> = Partial<
  T & IPageableFilterBase<TId>
>;

export interface IFilterNormalizer<T, TId = string> {
  normalize(filter: Filter<T, TId>): Filter<T, TId>;
  pageableNormalize(filter: PageableFilter<T, TId>): PageableFilter<T, TId>;
}
