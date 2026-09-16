import { CancelPurchaseReturnCommandHandler } from './cancel-purchase-return/cancel-purchase-return.command-handler';
import { CreatePurchaseReturnCommandHandler } from './create-purchase-return/create-purchase-return.command-handler';
import { FinalizePurchaseReturnCommandHandler } from './finalize-purchase-return/finalize-purchase-return.command-handler';
import { UpdatePurchaseReturnCommandHandler } from './update-purchase-return/update-purchase-return.command-handler';

export * from './cancel-purchase-return/cancel-purchase-return.command';
export * from './create-purchase-return/create-purchase-return.command';
export * from './finalize-purchase-return/finalize-purchase-return.command';
export * from './update-purchase-return/update-purchase-return.command';

export const PurchaseReturnCommandHandlers = [
  CancelPurchaseReturnCommandHandler,
  CreatePurchaseReturnCommandHandler,
  FinalizePurchaseReturnCommandHandler,
  UpdatePurchaseReturnCommandHandler,
];
