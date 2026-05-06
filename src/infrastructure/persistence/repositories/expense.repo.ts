import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { ExpenseEntity } from '../entities';
import { Expense } from '../../../application/modules/expenses/domain';
import { IExpenseRepo, ExpenseFilter } from '../../../application/modules/expenses';

@Injectable()
export class ExpenseRepo extends BaseRepo<ExpenseEntity, Expense, string, PageableFilter<ExpenseFilter>, Filter<ExpenseFilter>> implements IExpenseRepo {
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
}
