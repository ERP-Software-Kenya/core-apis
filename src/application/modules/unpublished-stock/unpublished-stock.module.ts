import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from 'src/application/shared';
import { UnpublishedStockController } from './unpublished-stock.controller';
import { UnpublishedStockCommandHandlers } from './commands';
import { UnpublishedStockQueryHandlers } from './queries';
import { UnpublishedStockProfile } from './mapper';

@Module({
  imports:     [CqrsModule, SharedModule],
  controllers: [UnpublishedStockController],
  providers:   [
    ...UnpublishedStockCommandHandlers,
    ...UnpublishedStockQueryHandlers,
    UnpublishedStockProfile,
  ],
})
export class UnpublishedStockModule {}
