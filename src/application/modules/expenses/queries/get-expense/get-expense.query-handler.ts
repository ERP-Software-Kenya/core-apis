import { ForbiddenException, Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ERole } from '../../../../../infrastructure/persistence/entities';
import { EXPENSE_REPO } from '../../../../constants';
import { Expense } from '../../domain';
import { IExpenseRepo } from '../..';
import { GetExpenseQuery } from './get-expense.query';

const PRIVILEGED_ROLES = new Set<ERole>([ERole.OrgAdmin, ERole.SuperAdmin]);

@QueryHandlerStrict(GetExpenseQuery)
export class GetExpenseQueryHandler implements IQueryHandler<GetExpenseQuery, Expense> {
  constructor(
    @Inject(EXPENSE_REPO) private readonly repo: IExpenseRepo,
    @InjectPinoLogger(GetExpenseQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetExpenseQuery): Promise<Expense> {
    this.logger.info(`Executing ${GetExpenseQuery.name} id=${query.id}`);
    const expense = await this.repo.getAsync(query.id);
    if (query.callerUserId) {
      const isPrivileged = (query.callerRoles ?? []).some((role) => PRIVILEGED_ROLES.has(role));
      if (!isPrivileged && expense.submittedByUserId !== query.callerUserId) {
        throw new ForbiddenException('Access denied to this expense');
      }
    }
    return expense;
  }
}
