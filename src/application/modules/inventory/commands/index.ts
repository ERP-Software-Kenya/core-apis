// Standard barrel file
export * from './create-inventory';
export * from './delete-inventory';
export * from './update-inventory';

import { CreateInventoryCommandHandler } from './create-inventory';
import { DeleteInventoryCommandHandler } from './delete-inventory';
import { UpdateInventoryCommandHandler } from './update-inventory';

export const InventoryCommandHandlers = [
  CreateInventoryCommandHandler,
  DeleteInventoryCommandHandler,
  UpdateInventoryCommandHandler,
];
