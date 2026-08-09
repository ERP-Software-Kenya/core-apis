import { IBaseRepo } from 'src/common';
import { FuelType } from '../domain';

export interface IFuelTypeRepo extends IBaseRepo<FuelType, string> {}
