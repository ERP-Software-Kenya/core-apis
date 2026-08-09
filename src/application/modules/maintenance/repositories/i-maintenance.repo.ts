import { IBaseRepo } from '../../../../common/db/i-base.repo';
import { Maintenance } from '../domain/maintenance.model';

export interface IMaintenanceRepo extends IBaseRepo<Maintenance, string> {}
