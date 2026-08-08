import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreateVehicleCommand extends CommandBase {
  @AutoMap() public vehicleNumber: string;
  @AutoMap() public vinNumber?: string;
  @AutoMap() public companyId: string;
  @AutoMap() public vehicleTypeId: string;
  @AutoMap() public brandId: string;
  @AutoMap() public fuelTypeId: string;
}
