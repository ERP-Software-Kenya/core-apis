import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { EXPENSE_REPO } from '../../../../constants';
import { Expense } from '../../domain';
import { IExpenseRepo } from '../..';
import { GetExpenseQuery } from './get-expense.query';

@QueryHandlerStrict(GetExpenseQuery)
export class GetExpenseQueryHandler implements IQueryHandler<GetExpenseQuery, Expense> {
  constructor(
    @Inject(EXPENSE_REPO) private readonly repo: IExpenseRepo,
    @InjectPinoLogger(GetExpenseQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetExpenseQuery): Promise<Expense> {
    this.logger.info(`Executing ${GetExpenseQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
