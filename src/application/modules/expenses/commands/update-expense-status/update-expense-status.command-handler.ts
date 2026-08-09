import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EXPENSE_REPO } from '../../../../constants';
import { Expense } from '../../domain';
import { IExpenseRepo } from '../..';
import { UpdateExpenseStatusCommand } from './update-expense-status.command';

@CommandHandlerStrict(UpdateExpenseStatusCommand)
export class UpdateExpenseStatusCommandHandler implements ICommandHandler<UpdateExpenseStatusCommand, Expense> {
  public constructor(
    @Inject(EXPENSE_REPO) private readonly repo: IExpenseRepo,
    @InjectPinoLogger(UpdateExpenseStatusCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateExpenseStatusCommand): Promise<Expense> {
    this.logger.info(`Executing ${UpdateExpenseStatusCommand.name}`);
    const expense = await this.repo.getAsync(command.id);
    expense.status = command.status;
    return this.repo.updateAsync(expense);
  }
}
