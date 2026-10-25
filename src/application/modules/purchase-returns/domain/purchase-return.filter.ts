import { EPurchaseReturnStatus } from '../../../../infrastructure/persistence/entities';

export interface PurchaseReturnFilter {
  organizationId?: string;
  branchId?: string;
  purchaseOrderId?: string;
  supplierId?: string;
  status?: EPurchaseReturnStatus;
  returnNumber?: string;
}
