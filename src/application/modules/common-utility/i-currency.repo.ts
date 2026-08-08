import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Currency, CurrencyFilter } from './domain';

export interface ICurrencyRepo extends IBaseRepo<Currency, number, PageableFilter<CurrencyFilter, number>, Filter<CurrencyFilter, number>> {}
