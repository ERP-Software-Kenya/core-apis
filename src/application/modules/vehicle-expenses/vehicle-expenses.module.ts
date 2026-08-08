import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VehicleExpensesController } from './vehicle-expenses.controller';
import { VehicleExpenseCommandHandlers } from './commands';
import { VehicleExpenseQueryHandlers } from './queries';
import { VehicleExpenseProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [VehicleExpensesController],
  providers:   [
    ...VehicleExpenseCommandHandlers,
    ...VehicleExpenseQueryHandlers,
    VehicleExpenseProfile,
  ],
})
export class VehicleExpensesModule {}
