import { AutoMap } from '@automapper/classes';

export class VehicleBrand {
  @AutoMap() public id: string;
  @AutoMap() public brandName: string;
}
