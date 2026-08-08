import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { City, CityFilter } from './domain';

export interface ICityRepo extends IBaseRepo<City, number, PageableFilter<CityFilter, number>, Filter<CityFilter, number>> {}
