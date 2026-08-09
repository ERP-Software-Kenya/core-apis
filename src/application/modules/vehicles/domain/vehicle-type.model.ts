import { AutoMap } from '@automapper/classes';

export class VehicleType {
  @AutoMap() public id: string;
  @AutoMap() public name: string;
  @AutoMap() public description?: string;
}
