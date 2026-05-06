import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EXPENSE_REPO } from '../../../../constants';
import { Expense } from '../../domain';
import { IExpenseRepo } from '../..';
import { CreateExpenseCommand } from './create-expense.command';

@CommandHandlerStrict(CreateExpenseCommand)
export class CreateExpenseCommandHandler implements ICommandHandler<CreateExpenseCommand, Expense> {
  constructor(
    @Inject(EXPENSE_REPO) private readonly repo: IExpenseRepo,
    @InjectPinoLogger(CreateExpenseCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateExpenseCommand): Promise<Expense> {
    this.logger.info(`Executing ${CreateExpenseCommand.name}`);
    return this.repo.createAsync(command as any);
  }
}
