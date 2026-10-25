import { IPageable } from 'src/common';
import { Tax } from './domain';
import { TaxFilter } from './domain';

export interface ITaxRepo {
  getAsync(id: string): Promise<Tax | null>;
  listAsync(filter: TaxFilter): Promise<Tax[]>;
  searchAsync(filter: TaxFilter): Promise<IPageable<Tax>>;
  createAsync(entity: Tax): Promise<Tax>;
  updateAsync(entity: Tax): Promise<Tax>;
  softDeleteAsync(id: string): Promise<boolean>;
}
