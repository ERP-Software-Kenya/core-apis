// Standard barrel file
export * from './create-product';
export * from './delete-product';
export * from './update-product';

import { CreateProductCommandHandler } from './create-product';
import { DeleteProductCommandHandler } from './delete-product';
import { UpdateProductCommandHandler } from './update-product';

export const ProductCommandHandlers = [
  CreateProductCommandHandler,
  DeleteProductCommandHandler,
  UpdateProductCommandHandler,
];
