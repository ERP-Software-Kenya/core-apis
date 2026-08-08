import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { EntityManager } from 'typeorm';
import { Inventory } from './domain';

export interface InventoryFilter {
  organizationId?: string;
  locationId?: string;
  productId?: string;
  lowStock?: boolean;
}

export const INVENTORY_REPO = 'INVENTORY_REPO';

export interface IInventoryRepo extends IBaseRepo<Inventory, string, PageableFilter<InventoryFilter>, Filter<InventoryFilter>> {
  addStockAsync(id: string, quantity: number, unitCost: number | undefined, manager: EntityManager): Promise<Inventory>;
  removeStockAsync(id: string, quantity: number, manager: EntityManager): Promise<Inventory>;
  adjustStockAsync(id: string, absoluteQty: number, unitCost: number | undefined, manager: EntityManager): Promise<Inventory>;
  reserveStockAsync(id: string, quantity: number, manager: EntityManager): Promise<Inventory>;
  releaseReservationAsync(id: string, quantity: number, manager: EntityManager): Promise<Inventory>;
  deductStockAsync(id: string, quantity: number, manager: EntityManager): Promise<Inventory>;
  findByOrgLocationProductAsync(organizationId: string, locationId: string, productId: string, manager: EntityManager): Promise<Inventory | null>;
  getLowStockAsync(organizationId: string): Promise<Inventory[]>;
  getValuationAsync(organizationId: string): Promise<Inventory[]>;
}
