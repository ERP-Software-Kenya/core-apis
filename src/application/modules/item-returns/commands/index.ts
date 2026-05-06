export * from './create-item-return';
export * from './update-item-return';
export * from './delete-item-return';

import { CreateItemReturnCommandHandler } from './create-item-return';
import { UpdateItemReturnCommandHandler } from './update-item-return';
import { DeleteItemReturnCommandHandler } from './delete-item-return';

export const ItemReturnCommandHandlers = [
  CreateItemReturnCommandHandler,
  UpdateItemReturnCommandHandler,
  DeleteItemReturnCommandHandler,
];
