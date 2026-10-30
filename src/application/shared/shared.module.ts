import { Module } from '@nestjs/common';
import { ActivityLogService } from './services/activity-log.service';
import { ProductActivityLogger } from './services/product-activity-logger.service';
import { StockOrchestrationService } from './services/stock-orchestration.service';
import { BillCompletionService } from './services/bill-completion.service';
import { OrderDispatchPaymentService } from './services/order-dispatch-payment.service';
import { NotificationDispatchService } from './services/notification-dispatch.service';
import { AppMailModule } from '../../common/mail/app-mail.module';

const PROVIDERS = [
  ActivityLogService,
  ProductActivityLogger,
  StockOrchestrationService,
  BillCompletionService,
  OrderDispatchPaymentService,
  NotificationDispatchService,
];

@Module({
  imports:   [AppMailModule],
  providers: PROVIDERS,
  exports:   PROVIDERS,
})
export class SharedModule {}
