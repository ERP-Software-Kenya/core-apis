import { EBillStatus, EPaymentMethod, ESaleType } from '../../../../infrastructure/persistence/entities';

export interface BillFilter {
  organizationId?: string;
  locationId?: string;
  customerId?: string;
  createdById?: string;
  billNumber?: string;
  status?: EBillStatus;
  paymentMethod?: EPaymentMethod;
  saleType?: ESaleType;
}

export interface BillItemFilter {
  billId?: string;
  productId?: string;
}
