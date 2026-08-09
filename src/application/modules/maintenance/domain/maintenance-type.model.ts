import { AutoMap } from '@automapper/classes';

export class MaintenanceType {
  @AutoMap() public id: string;
  @AutoMap() public name: string;
}
