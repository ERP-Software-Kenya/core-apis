import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreateTripCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public tripNumber: string;
  @AutoMap() public vehicleId: string;
  @AutoMap() public driverId: string;
  @AutoMap() public customerId: string;
  @AutoMap() public pickupLocation: string;
  @AutoMap() public dropLocation: string;
  @AutoMap() public startDatetime: Date;
  @AutoMap() public estimatedDistance?: number;
  @AutoMap() public priority: string;
}
