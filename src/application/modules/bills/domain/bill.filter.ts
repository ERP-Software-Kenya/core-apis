import { EBillStatus, EPaymentMethod } from '../../../../infrastructure/persistence/entities';

export interface BillFilter {
  organizationId?: string;
  locationId?: string;
  customerId?: string;
  createdById?: string;
  billNumber?: string;
  status?: EBillStatus;
  paymentMethod?: EPaymentMethod;
}

export interface BillItemFilter {
  billId?: string;
  productId?: string;
}
