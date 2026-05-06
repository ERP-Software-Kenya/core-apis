import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { User } from './domain';

export type UserFilter = Record<string, never>;

export type IUserRepo = IBaseRepo<User, string, PageableFilter<UserFilter>, Filter<UserFilter>>;
