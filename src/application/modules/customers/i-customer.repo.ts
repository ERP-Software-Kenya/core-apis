import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Customer, CustomerFilter } from './domain';

export type { CustomerFilter };
export type ICustomerRepo = IBaseRepo<Customer, string, PageableFilter<CustomerFilter>, Filter<CustomerFilter>>;
