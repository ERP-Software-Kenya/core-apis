import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Bill, BillFilter } from './domain';

export const BILL_REPO = 'BILL_REPO';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IBillRepo extends IBaseRepo<Bill, string, PageableFilter<BillFilter>, Filter<BillFilter>> {}
