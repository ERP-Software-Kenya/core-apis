import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepo, Filter, isNilOrEmpty, PageableFilter } from '../../../common';
import { ExpenseEntity } from '../entities';
import { Expense } from '../../../application/modules/expenses/domain';
import { ExpenseFilter, IExpenseRepo } from '../../../application/modules/expenses';

@Injectable()
export class ExpenseRepo
  extends BaseRepo<ExpenseEntity, Expense, string, PageableFilter<ExpenseFilter>, Filter<ExpenseFilter>>
  implements IExpenseRepo
{
  constructor(
    @InjectRepository(ExpenseEntity) internalRepo: Repository<ExpenseEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(ExpenseRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, ExpenseEntity, Expense);
  }

  public override get idColumnName(): keyof ExpenseEntity {
    return 'id';
  }

  public async listAsync(expenseFilter: ExpenseFilter): Promise<Expense[]> {
    const where: FindOptionsWhere<ExpenseEntity> = {};
    if (!isNilOrEmpty(expenseFilter.organizationId)) {
      where.organizationId = expenseFilter.organizationId;
    }
    if (!isNilOrEmpty(expenseFilter.status)) {
      where.status = expenseFilter.status;
    }
    if (!isNilOrEmpty(expenseFilter.submittedByUserId)) {
      where.submittedByUserId = expenseFilter.submittedByUserId;
    }
    const entities = await this.internalRepo.find({ where });
    return this.mapper.mapArray(entities, ExpenseEntity, Expense);
  }
}
