import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Role } from './domain';

export type RoleFilter = Record<string, never>;

export type IRoleRepo = IBaseRepo<Role, string, PageableFilter<RoleFilter>, Filter<RoleFilter>>;
