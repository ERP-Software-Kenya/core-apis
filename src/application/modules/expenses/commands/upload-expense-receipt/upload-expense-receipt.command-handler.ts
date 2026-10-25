import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ERole } from '../../../../../infrastructure/persistence/entities';
import { EXPENSE_REPO } from '../../../../constants';
import { Expense } from '../../domain';
import { IExpenseRepo } from '../..';
import { ExpenseReceiptStorage } from '../../storage/expense-receipt.storage';
import { UploadExpenseReceiptCommand } from './upload-expense-receipt.command';

const ADMIN_ROLES = new Set<ERole>([ERole.OrgAdmin, ERole.SuperAdmin]);

@CommandHandlerStrict(UploadExpenseReceiptCommand)
export class UploadExpenseReceiptCommandHandler implements ICommandHandler<UploadExpenseReceiptCommand, Expense> {
  public constructor(
    @Inject(EXPENSE_REPO) private readonly repo: IExpenseRepo,
    private readonly storage: ExpenseReceiptStorage,
    @InjectPinoLogger(UploadExpenseReceiptCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UploadExpenseReceiptCommand): Promise<Expense> {
    this.logger.info(`Executing Command '${UploadExpenseReceiptCommand.name}'`);
    const expense = await this.repo.getAsync(command.expenseId);
    if (!expense) {
      throw new NotFoundException(`Expense ${command.expenseId} not found`);
    }
    const isAdmin = (command.callerRoles ?? []).some((role) => ADMIN_ROLES.has(role));
    if (!isAdmin && expense.submittedByUserId !== command.callerUserId) {
      throw new ForbiddenException('Access denied to this expense');
    }
    if (expense.receiptKey) {
      await this.storage.removeAsync(expense.receiptKey);
    }
    const keyPath = `expenses/${command.expenseId}/receipt/${Date.now()}`;
    const key = await this.storage.writeAsync(keyPath, command.buffer, command.mimeType);
    expense.receiptKey = key;
    return this.repo.updateAsync(expense);
  }
}
