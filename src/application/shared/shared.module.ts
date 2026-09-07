import { Module } from '@nestjs/common';
import { ProductActivityLogger } from './services/product-activity-logger.service';
import { StockOrchestrationService } from './services/stock-orchestration.service';
import { BillCompletionService } from './services/bill-completion.service';
import { OrderDispatchPaymentService } from './services/order-dispatch-payment.service';

@Module({
  providers: [ProductActivityLogger, StockOrchestrationService, BillCompletionService, OrderDispatchPaymentService],
  exports:   [ProductActivityLogger, StockOrchestrationService, BillCompletionService, OrderDispatchPaymentService],
})
export class SharedModule {}
