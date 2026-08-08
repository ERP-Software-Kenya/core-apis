import { Module } from '@nestjs/common';
import { ProductActivityLogger } from './services/product-activity-logger.service';
import { StockOrchestrationService } from './services/stock-orchestration.service';

@Module({
  providers:  [ProductActivityLogger, StockOrchestrationService],
  exports:    [ProductActivityLogger, StockOrchestrationService],
})
export class SharedModule {}
