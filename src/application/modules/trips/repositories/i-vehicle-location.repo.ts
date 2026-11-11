import { IBaseRepo } from '../../../../common';
import { VehicleLocation } from '../../trip-operations/domain/vehicle-location.model';

export interface IVehicleLocationRepo extends IBaseRepo<VehicleLocation, string> {
  findByVehicleIdAsync(vehicleId: string): Promise<VehicleLocation | null>;
  findByVehicleIdsAsync(vehicleIds: string[]): Promise<VehicleLocation[]>;
  upsertByVehicleIdAsync(vehicleId: string, lat: number, lng: number, gpsTime: Date): Promise<void>;
}
