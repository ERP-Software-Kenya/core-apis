import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersController } from './orders.controller';
import { OrderCommandHandlers } from './commands';
import { OrderQueryHandlers } from './queries';
import { OrderProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [OrdersController],
  providers:   [
    ...OrderCommandHandlers,
    ...OrderQueryHandlers,
    OrderProfile,
  ],
})
export class OrdersModule {}
