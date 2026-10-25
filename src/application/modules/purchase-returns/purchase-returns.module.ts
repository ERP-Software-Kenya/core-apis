import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PurchaseReturnCommandHandlers } from './commands';
import { PurchaseReturnProfile } from './mapper';
import { PurchaseReturnQueryHandlers } from './queries';
import { PurchaseReturnsController } from './purchase-returns.controller';

@Module({
  imports: [CqrsModule],
  controllers: [PurchaseReturnsController],
  providers: [
    ...PurchaseReturnCommandHandlers,
    ...PurchaseReturnQueryHandlers,
    PurchaseReturnProfile,
  ],
})
export class PurchaseReturnsModule {}
