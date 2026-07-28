import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from 'src/application/shared';
import { StockTransfersController } from './stock-transfers.controller';
import { StockTransferCommandHandlers } from './commands';
import { StockTransferQueryHandlers } from './queries';
import { StockTransferProfile } from './mapper';

@Module({
  imports:     [CqrsModule, SharedModule],
  controllers: [StockTransfersController],
  providers:   [
    ...StockTransferCommandHandlers,
    ...StockTransferQueryHandlers,
    StockTransferProfile,
  ],
})
export class StockTransfersModule {}
