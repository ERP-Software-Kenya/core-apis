import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SalesReturnsController } from './sales-returns.controller';
import { SalesReturnCommandHandlers } from './commands';
import { SalesReturnQueryHandlers } from './queries';
import { SalesReturnProfile } from './mapper';

@Module({
  imports: [CqrsModule],
  controllers: [SalesReturnsController],
  providers: [
    ...SalesReturnCommandHandlers,
    ...SalesReturnQueryHandlers,
    SalesReturnProfile,
  ],
})
export class SalesReturnsModule {}
