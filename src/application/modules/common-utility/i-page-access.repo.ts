import type { PageAccess } from './domain';

export const PAGE_ACCESS_REPO = 'IPageAccessRepo';

export interface IPageAccessRepo {
  findAllAsync(): Promise<PageAccess[]>;
  upsertManyAsync(configs: ReadonlyArray<{ pageKey: string; allowedRoles: string[] }>): Promise<void>;
}
