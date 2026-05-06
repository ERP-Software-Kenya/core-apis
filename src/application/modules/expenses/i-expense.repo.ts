import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Expense } from './domain';

export type ExpenseFilter = Record<string, never>;

export type IExpenseRepo = IBaseRepo<Expense, string, PageableFilter<ExpenseFilter>, Filter<ExpenseFilter>>;
