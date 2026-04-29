// Standard barrel file
export * from './create-supplier';
export * from './delete-supplier';
export * from './update-supplier';

import { CreateSupplierCommandHandler } from './create-supplier';
import { DeleteSupplierCommandHandler } from './delete-supplier';
import { UpdateSupplierCommandHandler } from './update-supplier';

export const SupplierCommandHandlers = [
  CreateSupplierCommandHandler,
  DeleteSupplierCommandHandler,
  UpdateSupplierCommandHandler,
];
