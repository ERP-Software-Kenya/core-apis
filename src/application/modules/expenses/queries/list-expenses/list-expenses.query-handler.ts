import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { EXPENSE_REPO } from '../../../../constants';
import { Expense } from '../../domain';
import { IExpenseRepo } from '../..';
import { ExpenseResponse } from '../../models';
import { ListExpensesQuery } from './list-expenses.query';

@QueryHandlerStrict(ListExpensesQuery)
export class ListExpensesQueryHandler implements IQueryHandler<ListExpensesQuery, ExpenseResponse[]> {
  public constructor(
    @Inject(EXPENSE_REPO) private readonly repo: IExpenseRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(ListExpensesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(_query: ListExpensesQuery): Promise<ExpenseResponse[]> {
    this.logger.info(`Executing ${ListExpensesQuery.name}`);
    const expenses = await this.repo.allAsync();
    return this.mapper.mapArray(expenses, Expense, ExpenseResponse);
  }
}
