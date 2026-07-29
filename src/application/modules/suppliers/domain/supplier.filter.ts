import { AutoMap } from '@automapper/classes';

export class SupplierFilter {
  @AutoMap() public name?: string;
  @AutoMap() public isActive?: boolean;
}
