import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CqrsMediator, isNilOrEmpty } from '../../../../../common';
import { EXPENSE_REPO } from '../../../../constants';
import { CreateNotificationCommand } from '../../../notifications/commands/create-notification/create-notification.command';
import { Expense } from '../../domain';
import { IExpenseRepo } from '../..';
import { EExpenseStatus } from '../../../../../infrastructure/e-expense-status';
import { UpdateExpenseStatusCommand } from './update-expense-status.command';

type StatusTransition = `${EExpenseStatus}->${EExpenseStatus}`;

const ALLOWED_TRANSITIONS = new Set<StatusTransition>([
  `${EExpenseStatus.Pending}->${EExpenseStatus.UnderReview}`,
  `${EExpenseStatus.Pending}->${EExpenseStatus.Rejected}`,
  `${EExpenseStatus.UnderReview}->${EExpenseStatus.Approved}`,
  `${EExpenseStatus.UnderReview}->${EExpenseStatus.Rejected}`,
  `${EExpenseStatus.Approved}->${EExpenseStatus.Settled}`,
]);

const COMMENT_REQUIRED_STATUSES = new Set<EExpenseStatus>([
  EExpenseStatus.UnderReview,
  EExpenseStatus.Rejected,
]);

@CommandHandlerStrict(UpdateExpenseStatusCommand)
export class UpdateExpenseStatusCommandHandler implements ICommandHandler<UpdateExpenseStatusCommand, Expense> {
  public constructor(
    @Inject(EXPENSE_REPO) private readonly repo: IExpenseRepo,
    private readonly mediator: CqrsMediator,
    @InjectPinoLogger(UpdateExpenseStatusCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateExpenseStatusCommand): Promise<Expense> {
    this.logger.info(`Executing Command '${UpdateExpenseStatusCommand.name}'`);
    const expense = await this.repo.getAsync(command.id);
    const transition: StatusTransition = `${expense.status}->${command.status}`;
    if (!ALLOWED_TRANSITIONS.has(transition)) {
      throw new BadRequestException('Invalid status transition');
    }
    if (COMMENT_REQUIRED_STATUSES.has(command.status) && isNilOrEmpty(command.comment)) {
      throw new BadRequestException('Comment is required for this status');
    }
    expense.status = command.status;
    if (!isNilOrEmpty(command.comment)) {
      expense.adminComment = command.comment;
    }
    const updated = await this.repo.updateAsync(expense);
    await this.notifySubmitterAsync(command, updated);
    return updated;
  }

  private async notifySubmitterAsync(command: UpdateExpenseStatusCommand, expense: Expense): Promise<void> {
    const amount = expense.amount;
    const category = expense.category;
    const comment = command.comment ?? '';
    const notif = new CreateNotificationCommand();
    notif.userId = expense.submittedByUserId;
    notif.orgId  = expense.organizationId;
    notif.type   = 'expense.status_changed';

    switch (command.status) {
      case EExpenseStatus.UnderReview:
        notif.title = 'Expense Under Review';
        notif.body  = `Your ₹${amount} ${category} claim needs more information`;
        break;
      case EExpenseStatus.Approved:
        notif.title = 'Expense Approved';
        notif.body  = `Your ₹${amount} ${category} claim has been approved`;
        break;
      case EExpenseStatus.Rejected:
        notif.title = 'Expense Rejected';
        notif.body  = `Your ₹${amount} ${category} claim was rejected: ${comment}`;
        break;
      case EExpenseStatus.Settled:
        notif.title = 'Expense Settled';
        notif.body  = `Your ₹${amount} ${category} claim has been settled`;
        break;
      default:
        return;
    }

    await this.mediator.execute<CreateNotificationCommand, unknown>(notif);
  }
}
