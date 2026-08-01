import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { State, StateFilter } from './domain';

export interface IStateRepo extends IBaseRepo<State, number, PageableFilter<StateFilter, number>, Filter<StateFilter, number>> {}
