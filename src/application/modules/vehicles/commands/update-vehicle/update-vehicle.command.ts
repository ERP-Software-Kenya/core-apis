import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../common';

export class UpdateVehicleCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public vehicleNumber?: string;
  @AutoMap() public vinNumber?: string;
  @AutoMap() public registrationNumber?: string;
  @AutoMap() public vehicleTypeId?: string;
  @AutoMap() public brandId?: string;
  @AutoMap() public model?: string;
  @AutoMap() public manufactureYear?: number;
  @AutoMap() public color?: string;
  @AutoMap() public fuelTypeId?: string;
  @AutoMap() public tankCapacity?: number;
  @AutoMap() public payloadCapacity?: number;
  @AutoMap() public notes?: string;
}
