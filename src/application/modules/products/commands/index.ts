// Standard barrel file
export * from './create-product';
export * from './delete-product';
export * from './update-product';
export * from './add-product-image';
export * from './link-product-supplier';
export * from './update-product-supplier';
export * from './unlink-product-supplier';
export * from './upload-product-image';

import { CreateProductCommandHandler } from './create-product';
import { DeleteProductCommandHandler } from './delete-product';
import { UpdateProductCommandHandler } from './update-product';
import { AddProductImageCommandHandler } from './add-product-image';
import { LinkProductSupplierCommandHandler } from './link-product-supplier';
import { UpdateProductSupplierCommandHandler } from './update-product-supplier';
import { UnlinkProductSupplierCommandHandler } from './unlink-product-supplier';
import { UploadProductImageCommandHandler } from './upload-product-image';

export const ProductCommandHandlers = [
  CreateProductCommandHandler,
  DeleteProductCommandHandler,
  UpdateProductCommandHandler,
  AddProductImageCommandHandler,
  LinkProductSupplierCommandHandler,
  UpdateProductSupplierCommandHandler,
  UnlinkProductSupplierCommandHandler,
  UploadProductImageCommandHandler,
];
