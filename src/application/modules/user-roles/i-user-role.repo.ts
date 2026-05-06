import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { UserRole } from './domain';

export type UserRoleFilter = Record<string, never>;

export type IUserRoleRepo = IBaseRepo<UserRole, string, PageableFilter<UserRoleFilter>, Filter<UserRoleFilter>>;
