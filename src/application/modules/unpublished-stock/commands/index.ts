import { AddUnpublishedStockCommandHandler } from './add-unpublished-stock';
import { PublishUnpublishedStockCommandHandler } from './publish-unpublished-stock';

export * from './add-unpublished-stock';
export * from './publish-unpublished-stock';

export const UnpublishedStockCommandHandlers = [
  AddUnpublishedStockCommandHandler,
  PublishUnpublishedStockCommandHandler,
];
