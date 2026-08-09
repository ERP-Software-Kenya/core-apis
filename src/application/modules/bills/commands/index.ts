export * from './create-bill';
export * from './update-bill';
export * from './delete-bill';
export * from './transition-bill-status';
export * from './add-bill-item';
export * from './update-bill-item';
export * from './remove-bill-item';

import { CreateBillCommandHandler } from './create-bill';
import { UpdateBillCommandHandler } from './update-bill';
import { DeleteBillCommandHandler } from './delete-bill';
import { TransitionBillStatusCommandHandler } from './transition-bill-status';
import { AddBillItemCommandHandler } from './add-bill-item';
import { UpdateBillItemCommandHandler } from './update-bill-item';
import { RemoveBillItemCommandHandler } from './remove-bill-item';

export const BillCommandHandlers = [
  CreateBillCommandHandler,
  UpdateBillCommandHandler,
  DeleteBillCommandHandler,
  TransitionBillStatusCommandHandler,
  AddBillItemCommandHandler,
  UpdateBillItemCommandHandler,
  RemoveBillItemCommandHandler,
];
