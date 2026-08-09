import { IBaseRepo } from 'src/common';
import { VehicleBrand } from '../domain';

export interface IVehicleBrandRepo extends IBaseRepo<VehicleBrand, string> {}
