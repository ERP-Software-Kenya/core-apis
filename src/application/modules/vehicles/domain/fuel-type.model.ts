import { AutoMap } from '@automapper/classes';

export class FuelType {
  @AutoMap() public id: string;
  @AutoMap() public name: string;
}
