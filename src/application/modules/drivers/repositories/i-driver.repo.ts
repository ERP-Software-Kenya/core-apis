import { IBaseRepo } from '../../../../common/db/i-base.repo';
import { Driver } from '../domain/driver';

export interface IDriverRepo extends IBaseRepo<Driver, string> {}
