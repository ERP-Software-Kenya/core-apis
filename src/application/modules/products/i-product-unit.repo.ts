import { IBaseRepo, Filter } from '../../../common';
import { ProductUnit } from './domain';

export interface ProductUnitFilter {
  productId?: string;
  unitId?: string;
}

export const PRODUCT_UNIT_REPO = 'PRODUCT_UNIT_REPO';

export interface IProductUnitRepo extends IBaseRepo<ProductUnit, string, Filter<ProductUnitFilter>, Filter<ProductUnitFilter>> {
  syncForProductAsync(productId: string, unitIds: string[], defaultUnitId?: string): Promise<void>;
}
