export * from './create-bill';
export * from './update-bill';
export * from './delete-bill';
export * from './add-bill-item';
export * from './update-bill-item';
export * from './remove-bill-item';
export * from './transition-bill-status';

import { CreateBillCommandHandler } from './create-bill';
import { UpdateBillCommandHandler } from './update-bill';
import { DeleteBillCommandHandler } from './delete-bill';
import { AddBillItemCommandHandler } from './add-bill-item';
import { UpdateBillItemCommandHandler } from './update-bill-item';
import { RemoveBillItemCommandHandler } from './remove-bill-item';
import { TransitionBillStatusCommandHandler } from './transition-bill-status';

export const BillCommandHandlers = [
  CreateBillCommandHandler,
  UpdateBillCommandHandler,
  DeleteBillCommandHandler,
  AddBillItemCommandHandler,
  UpdateBillItemCommandHandler,
  RemoveBillItemCommandHandler,
  TransitionBillStatusCommandHandler,
];
