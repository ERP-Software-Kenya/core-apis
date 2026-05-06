import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { ItemReturn ,ItemReturnFilter} from './domain';
export const ITEM_RETURN_REPO = 'ITEM_RETURN_REPO';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IItemReturnRepo extends IBaseRepo<ItemReturn, string, PageableFilter<ItemReturnFilter>, Filter<ItemReturnFilter>> {}
