import { AutoMap } from '@automapper/classes';

export class ProductFilter {
  @AutoMap() public name?: string;
  @AutoMap() public categoryId?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap() public organizationId?: string;
}
