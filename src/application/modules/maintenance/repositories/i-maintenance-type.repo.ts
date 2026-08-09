import { IBaseRepo } from 'src/common';
import { MaintenanceType } from '../domain';

export interface IMaintenanceTypeRepo extends IBaseRepo<MaintenanceType, string> {}
