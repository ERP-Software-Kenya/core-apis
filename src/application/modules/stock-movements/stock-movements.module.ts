import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StockMovementsController } from './stock-movements.controller';
import { StockMovementCommandHandlers } from './commands';
import { StockMovementQueryHandlers } from './queries';
import { StockMovementProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [StockMovementsController],
  providers:   [
    ...StockMovementCommandHandlers,
    ...StockMovementQueryHandlers,
    StockMovementProfile,
  ],
})
export class StockMovementsModule {}
