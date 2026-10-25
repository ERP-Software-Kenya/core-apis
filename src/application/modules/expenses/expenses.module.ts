import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { R2StorageOptions } from 'src/common';
import { ExpensesController } from './expenses.controller';
import { ExpenseCommandHandlers } from './commands';
import { ExpenseQueryHandlers } from './queries';
import { ExpenseProfile } from './mapper';
import { ExpenseReceiptStorage } from './storage/expense-receipt.storage';

@Module({
  imports:     [CqrsModule],
  controllers: [ExpensesController],
  providers:   [
    {
      provide: R2StorageOptions,
      useFactory: (config: ConfigService): R2StorageOptions =>
        new R2StorageOptions(
          config.get('STORAGE_ENDPOINT', ''),
          config.get('STORAGE_REGION', ''),
          config.get('STORAGE_ACCESS_KEY_ID', ''),
          config.get('STORAGE_SECRET_ACCESS_KEY', ''),
          config.get('STORAGE_BUCKET', ''),
          config.get('STORAGE_PUBLIC_URL_BASE', ''),
        ),
      inject: [ConfigService],
    },
    ExpenseReceiptStorage,
    ...ExpenseCommandHandlers,
    ...ExpenseQueryHandlers,
    ExpenseProfile,
  ],
})
export class ExpensesModule {}
