import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, CqrsMediator, isNilOrEmpty } from '../../../../../common';
import { ERole } from '../../../../../infrastructure/persistence/entities';
import { EXPENSE_REPO } from '../../../../constants';
import { CreateNotificationCommand } from '../../../notifications/commands/create-notification/create-notification.command';
import { ListUserRolesQuery } from '../../../user-roles/queries/list-user-roles/list-user-roles.query';
import { UserRoleResponse } from '../../../user-roles/models/responses/user-role.response';
import { Expense } from '../../domain';
import { IExpenseRepo } from '../..';
import { CreateExpenseCommand } from './create-expense.command';

@CommandHandlerStrict(CreateExpenseCommand)
export class CreateExpenseCommandHandler implements ICommandHandler<CreateExpenseCommand, Expense> {
  constructor(
    @Inject(EXPENSE_REPO) private readonly repo: IExpenseRepo,
    private readonly mediator: CqrsMediator,
    @InjectPinoLogger(CreateExpenseCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateExpenseCommand): Promise<Expense> {
    this.logger.info(`Executing Command '${CreateExpenseCommand.name}'`);
    const expense = new Expense();
    expense.organizationId    = command.organizationId;
    expense.locationId        = command.locationId;
    expense.category          = command.category;
    expense.amount            = command.amount;
    expense.expenseDate       = command.expenseDate;
    expense.description       = command.description;
    expense.submittedBy       = command.submittedBy;
    expense.submittedByUserId = command.submittedByUserId;
    expense.submittedByName   = command.submittedByName;

    const created = await this.repo.createAsync(expense);
    await this.notifyAdminsAsync(command, created);
    return created;
  }

  private async notifyAdminsAsync(command: CreateExpenseCommand, expense: Expense): Promise<void> {
    const userRolesQuery = new ListUserRolesQuery();
    userRolesQuery.organizationId = command.organizationId;
    const userRoles = await this.mediator.execute<ListUserRolesQuery, UserRoleResponse[]>(userRolesQuery);
    const adminUserIds = userRoles
      .filter((ur) => ur.roleId === ERole.OrgAdmin)
      .map((ur) => ur.userId);
    const submitterName = isNilOrEmpty(command.submittedByName) ? 'Someone' : command.submittedByName;
    const body = `${submitterName} submitted ₹${command.amount} for ${command.category}`;
    for (const adminUserId of adminUserIds) {
      const notification = new CreateNotificationCommand();
      notification.userId = adminUserId;
      notification.orgId  = command.organizationId;
      notification.type   = 'expense.submitted';
      notification.title  = 'New Expense Claim';
      notification.body   = body;
      await this.mediator.execute<CreateNotificationCommand, unknown>(notification);
    }
  }
}
