// Standard barrel file
export * from './create-purchaseorder';
export * from './delete-purchaseorder';
export * from './update-purchaseorder';

import { CreatePurchaseOrderCommandHandler } from './create-purchaseorder';
import { DeletePurchaseOrderCommandHandler } from './delete-purchaseorder';
import { UpdatePurchaseOrderCommandHandler } from './update-purchaseorder';

export const PurchaseOrderCommandHandlers = [
  CreatePurchaseOrderCommandHandler,
  DeletePurchaseOrderCommandHandler,
  UpdatePurchaseOrderCommandHandler,
];
