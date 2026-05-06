import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Customer } from './domain';

export type CustomerFilter = Record<string, never>;

export type ICustomerRepo = IBaseRepo<Customer, string, PageableFilter<CustomerFilter>, Filter<CustomerFilter>>;
