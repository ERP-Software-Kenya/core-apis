// Standard barrel file
export * from './create-category';
export * from './delete-category';
export * from './update-category';

import { CreateCategoryCommandHandler } from './create-category';
import { DeleteCategoryCommandHandler } from './delete-category';
import { UpdateCategoryCommandHandler } from './update-category';

export const CategoryCommandHandlers = [
  CreateCategoryCommandHandler,
  DeleteCategoryCommandHandler,
  UpdateCategoryCommandHandler,
];
