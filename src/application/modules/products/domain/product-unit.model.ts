import { AutoMap } from '@automapper/classes';

export class ProductUnit {
  @AutoMap() public id: string;
  @AutoMap() public productId: string;
  @AutoMap() public unitId: string;
  @AutoMap() public unitName?: string;
  @AutoMap() public unitSymbol?: string;
  @AutoMap() public isDefault: boolean;
}
