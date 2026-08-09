import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { BillItem, BillItemFilter } from './domain';

export const BILL_ITEM_REPO = 'BILL_ITEM_REPO';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IBillItemRepo extends IBaseRepo<BillItem, string, PageableFilter<BillItemFilter>, Filter<BillItemFilter>> {}
