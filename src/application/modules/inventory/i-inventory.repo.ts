import { IBaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { Inventory } from './domain';

export interface InventoryFilter {
  search?: string;
  isActive?: boolean;
}

export const INVENTORY_REPO = 'INVENTORY_REPO';


export interface IInventoryRepo extends IBaseRepo<Inventory, string, PageableFilter<InventoryFilter>, Filter<InventoryFilter>> {
}
