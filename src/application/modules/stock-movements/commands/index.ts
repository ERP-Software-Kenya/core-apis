import { AddStockCommandHandler } from './add-stock';
import { RemoveStockCommandHandler } from './remove-stock';
import { AdjustStockCommandHandler } from './adjust-stock';
import { ReserveStockCommandHandler } from './reserve-stock';
import { ReleaseReservationCommandHandler } from './release-reservation';
import { AddUnpublishedStockCommandHandler } from './add-unpublished-stock';
import { PublishStockCommandHandler } from './publish-stock';
import { DamageStockCommandHandler } from './damage-stock';
import { WriteOffStockCommandHandler } from './write-off-stock';

export * from './add-stock';
export * from './remove-stock';
export * from './adjust-stock';
export * from './reserve-stock';
export * from './release-reservation';
export * from './add-unpublished-stock';
export * from './publish-stock';
export * from './damage-stock';
export * from './write-off-stock';

export const StockMovementCommandHandlers = [
  AddStockCommandHandler,
  RemoveStockCommandHandler,
  AdjustStockCommandHandler,
  ReserveStockCommandHandler,
  ReleaseReservationCommandHandler,
  AddUnpublishedStockCommandHandler,
  PublishStockCommandHandler,
  DamageStockCommandHandler,
  WriteOffStockCommandHandler,
];
