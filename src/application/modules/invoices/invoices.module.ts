import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InvoicesController } from './invoices.controller';
import { InvoiceCommandHandlers } from './commands';
import { InvoiceQueryHandlers } from './queries';
import { InvoiceProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [InvoicesController],
  providers:   [
    ...InvoiceCommandHandlers,
    ...InvoiceQueryHandlers,
    InvoiceProfile,
  ],
})
export class InvoicesModule {}
