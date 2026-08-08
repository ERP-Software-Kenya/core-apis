import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { User } from './domain';

export type UserFilter = Record<string, never>;

export interface IUserRepo extends IBaseRepo<User, string, PageableFilter<UserFilter>, Filter<UserFilter>> {
  findByClerkIdAsync(clerkUserId: string): Promise<User | null>;
  upsertByClerkIdAsync(clerkUserId: string, data: Partial<User>): Promise<User>;
}
