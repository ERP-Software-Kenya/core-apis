import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { CommissionPayable } from './domain';

export interface CommissionPayableFilter {
  organizationId?: string;
  status?: string;
  billId?: string;
}

export const COMMISSION_PAYABLE_REPO = 'COMMISSION_PAYABLE_REPO';
export type ICommissionPayableRepo = IBaseRepo<
  CommissionPayable,
  string,
  PageableFilter<CommissionPayableFilter>,
  Filter<CommissionPayableFilter>
>;
