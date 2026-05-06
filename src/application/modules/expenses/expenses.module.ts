import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExpensesController } from './expenses.controller';
import { ExpenseCommandHandlers } from './commands';
import { ExpenseQueryHandlers } from './queries';
import { ExpenseProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [ExpensesController],
  providers:   [
    ...ExpenseCommandHandlers,
    ...ExpenseQueryHandlers,
    ExpenseProfile,
  ],
})
export class ExpensesModule {}
