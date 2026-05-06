import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PaymentTransactionsController } from './payment-transactions.controller';
import { PaymentTransactionCommandHandlers } from './commands';
import { PaymentTransactionQueryHandlers } from './queries';
import { PaymentTransactionProfile } from './mapper/payment-transaction.profile';
import { PaymentTransactionFeatureOptions } from './options/payment-transaction-feature.options';
import { PaymentTransactionFilterNormalizer } from './helpers/payment-transaction-filter.normalizer';

@Module({
  imports: [CqrsModule],
  controllers: [PaymentTransactionsController],
  providers: [
    ...PaymentTransactionCommandHandlers,
    ...PaymentTransactionQueryHandlers,
    PaymentTransactionProfile,
    PaymentTransactionFeatureOptions,
    PaymentTransactionFilterNormalizer,
  ],
})
export class PaymentTransactionsModule {}
