import { IBaseRepo } from '../../../../common';
import { Trip } from '../domain';
import { ETripStatus } from '../../../shared/enums/e-trip-status';
import { ETripStopStatus } from '../../../shared/enums/e-trip-stop-status';

export interface DriverTripStopDetail {
  stopId: string;
  sequence: number;
  customerName: string;
  customerEmail: string;
  address: string;
  status: ETripStopStatus;
  latitude?: number;
  longitude?: number;
}

export interface DriverTripDetail {
  id: string;
  tripNumber: string;
  vehiclePlate: string;
  status: ETripStatus;
  createdAt: Date;
  stops: DriverTripStopDetail[];
}

export interface ITripRepo extends IBaseRepo<Trip, string> {
  findByStatusAsync(status: ETripStatus, organizationId: string): Promise<Trip[]>;
  findByDriverAndDateAsync(
    driverId: string,
    startDate: Date,
    endDate: Date,
    statuses: ETripStatus[],
  ): Promise<Trip[]>;
  findDetailForDriverAsync(tripId: string, driverId: string): Promise<DriverTripDetail | null>;
  createTripWithStopsAsync(
    driverId: string,
    vehicleId: string,
    stops: Array<{ orderId: string; sequence: number; latitude?: number; longitude?: number }>,
  ): Promise<Trip>;
}
