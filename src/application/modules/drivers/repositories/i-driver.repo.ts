import { IBaseRepo } from '../../../../common';
import { Driver } from '../domain';

export interface IDriverRepo extends IBaseRepo<Driver, string> {
  findByUserIdAsync(userId: string): Promise<Driver | null>;
}
