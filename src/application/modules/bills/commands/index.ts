export * from './create-bill';
export * from './update-bill';
export * from './delete-bill';

import { CreateBillCommandHandler } from './create-bill';
import { UpdateBillCommandHandler } from './update-bill';
import { DeleteBillCommandHandler } from './delete-bill';

export const BillCommandHandlers = [
  CreateBillCommandHandler,
  UpdateBillCommandHandler,
  DeleteBillCommandHandler,
];
