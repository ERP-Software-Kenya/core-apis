import { AutoMap } from '@automapper/classes';

export class FuelTransaction {
  @AutoMap() public id: string;
  @AutoMap() public vehicleId: string;
  @AutoMap() public driverId: string;
  @AutoMap() public tripId?: string;
  @AutoMap() public fuelStation: string;
  @AutoMap() public fuelQuantity: number;
  @AutoMap() public pricePerLiter: number;
  @AutoMap() public totalCost: number;
  @AutoMap() public filledAt: Date;
}
