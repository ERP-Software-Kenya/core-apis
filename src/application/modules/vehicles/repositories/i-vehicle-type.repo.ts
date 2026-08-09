import { IBaseRepo } from 'src/common';
import { VehicleType } from '../domain';

export interface IVehicleTypeRepo extends IBaseRepo<VehicleType, string> {}
