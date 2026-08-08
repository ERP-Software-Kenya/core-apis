import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../common';

export class UpdateTripCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public vehicleId?: string;
  @AutoMap() public driverId?: string;
  @AutoMap() public pickupLocation?: string;
  @AutoMap() public dropLocation?: string;
  @AutoMap() public startDatetime?: Date;
  @AutoMap() public endDatetime?: Date;
  @AutoMap() public estimatedDistance?: number;
  @AutoMap() public actualDistance?: number;
  @AutoMap() public priority?: string;
}
