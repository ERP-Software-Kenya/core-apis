// Standard barrel file
export * from './create-product';
export * from './delete-product';
export * from './update-product';
export * from './add-product-image';

import { CreateProductCommandHandler } from './create-product';
import { DeleteProductCommandHandler } from './delete-product';
import { UpdateProductCommandHandler } from './update-product';
import { AddProductImageCommandHandler } from './add-product-image';

export const ProductCommandHandlers = [
  CreateProductCommandHandler,
  DeleteProductCommandHandler,
  UpdateProductCommandHandler,
  AddProductImageCommandHandler,
];
