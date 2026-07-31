import { EBillStatus } from '../../../../infrastructure/persistence/entities/bill.entity';

export interface BillFilter {
  organizationId?: string;
  locationId?: string;
  customerId?: string;
  status?: EBillStatus;
}
