import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Language, LanguageFilter } from './domain';

export interface ILanguageRepo extends IBaseRepo<Language, number, PageableFilter<LanguageFilter, number>, Filter<LanguageFilter, number>> {}
