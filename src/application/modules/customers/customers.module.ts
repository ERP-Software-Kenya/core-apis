import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomersController } from './customers.controller';
import { CustomerCommandHandlers } from './commands';
import { CustomerQueryHandlers } from './queries';
import { CustomerProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [CustomersController],
  providers:   [
    ...CustomerCommandHandlers,
    ...CustomerQueryHandlers,
    CustomerProfile,
  ],
})
export class CustomersModule {}
