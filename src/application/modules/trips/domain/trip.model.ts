import { AutoMap } from '@automapper/classes';
import { ETripStatus } from '../../../shared/enums/e-trip-status';

export class Trip {
  @AutoMap()
  public id: string;
  @AutoMap()
  public tripNumber: string;
  @AutoMap()
  public vehicleId: string;
  @AutoMap()
  public driverId: string;
  @AutoMap()
  public customerId: string;
  @AutoMap()
  public pickupLocation: string;
  @AutoMap()
  public dropLocation: string;
  @AutoMap()
  public startDatetime: Date;
  @AutoMap()
  public endDatetime?: Date;
  @AutoMap()
  public estimatedDistance?: number;
  @AutoMap()
  public actualDistance?: number;
  @AutoMap()
  public tripStatus: ETripStatus;
  @AutoMap()
  public priority: string;
}
