import { Module } from '@nestjs/common';
import { ProductActivityLogger } from './services/product-activity-logger.service';
import { StockOrchestrationService } from './services/stock-orchestration.service';
import { BillCompletionService } from './services/bill-completion.service';

@Module({
  providers: [ProductActivityLogger, StockOrchestrationService, BillCompletionService],
  exports:   [ProductActivityLogger, StockOrchestrationService, BillCompletionService],
})
export class SharedModule {}
