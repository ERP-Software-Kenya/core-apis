import { EBillStatus, EPaymentMethod, ESaleType } from '../../../../infrastructure/persistence/entities';

export interface BillFilter {
  organizationId?: string;
  locationId?: string;
  accessibleLocationIds?: string[];
  customerId?: string;
  createdById?: string;
  billNumber?: string;
  status?: EBillStatus;
  paymentMethod?: EPaymentMethod;
  saleType?: ESaleType;
  saleTypeNot?: ESaleType;
  /** Inclusive createdAt bounds (ISO 8601). */
  dateFrom?: string;
  dateTo?: string;
}

export interface BillItemFilter {
  billId?: string;
  productId?: string;
}
