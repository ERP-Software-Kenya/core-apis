import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../../shared';
import { OrderOperationsController } from './order-operations.controller';
import { OrderOperationCommandHandlers } from './commands';
import { OrderOperationQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [OrderOperationsController],
  providers: [
    ...OrderOperationCommandHandlers,
    ...OrderOperationQueryHandlers,
  ],
})
export class OrderOperationsModule {}
