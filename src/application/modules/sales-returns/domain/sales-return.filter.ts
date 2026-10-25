import { ESalesReturnStatus } from '../../../../infrastructure/persistence/entities';

export interface SalesReturnFilter {
  organizationId?: string;
  locationId?: string;
  accessibleLocationIds?: string[];
  billId?: string;
  customerId?: string;
  status?: ESalesReturnStatus;
  returnNumber?: string;
}
