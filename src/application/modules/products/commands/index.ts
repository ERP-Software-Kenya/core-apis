// Standard barrel file
export * from './create-product';
export * from './delete-product';
export * from './update-product';
export * from './upload-product-image';

import { CreateProductCommandHandler } from './create-product';
import { DeleteProductCommandHandler } from './delete-product';
import { UpdateProductCommandHandler } from './update-product';
import { UploadProductImageCommandHandler } from './upload-product-image';

export const ProductCommandHandlers = [
  CreateProductCommandHandler,
  DeleteProductCommandHandler,
  UpdateProductCommandHandler,
  UploadProductImageCommandHandler,
];
