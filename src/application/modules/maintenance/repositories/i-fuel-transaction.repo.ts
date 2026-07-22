import { IBaseRepo } from '../../../../common/db/i-base.repo';
import { FuelTransaction } from '../domain/fuel-transaction.model';

export interface IFuelTransactionRepo extends IBaseRepo<FuelTransaction, string> {}
