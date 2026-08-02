import { GetUnpublishedStockQueryHandler } from './get-unpublished-stock';
import { ListMovementsByUnpublishedStockQueryHandler } from './list-movements-by-unpublished-stock';
import { ListUnpublishedStockQueryHandler } from './list-unpublished-stock';

export * from './get-unpublished-stock';
export * from './list-movements-by-unpublished-stock';
export * from './list-unpublished-stock';

export const UnpublishedStockQueryHandlers = [
  GetUnpublishedStockQueryHandler,
  ListMovementsByUnpublishedStockQueryHandler,
  ListUnpublishedStockQueryHandler,
];
