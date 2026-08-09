import { AutoMap } from '@automapper/classes';
import { EVehicleStatus } from '../../../shared/enums/e-vehicle-status';

export class Vehicle {
  @AutoMap()
  public id: string;

  @AutoMap()
  public vehicleNumber: string;

  @AutoMap()
  public vinNumber?: string;

  @AutoMap()
  public registrationNumber?: string;

  @AutoMap()
  public companyId: string;

  @AutoMap()
  public vehicleTypeId: string;

  @AutoMap()
  public brandId: string;

  @AutoMap()
  public model?: string;

  @AutoMap()
  public manufactureYear?: number;

  @AutoMap()
  public color?: string;

  @AutoMap()
  public fuelTypeId: string;

  @AutoMap()
  public tankCapacity?: number;

  @AutoMap()
  public payloadCapacity?: number;

  @AutoMap()
  public mileage?: number;

  @AutoMap()
  public purchaseDate?: Date;

  @AutoMap()
  public purchasePrice?: number;

  @AutoMap()
  public insuranceExpiry?: Date;

  @AutoMap()
  public registrationExpiry?: Date;

  @AutoMap()
  public status: EVehicleStatus;

  @AutoMap()
  public imageUrl?: string;

  @AutoMap()
  public notes?: string;
}
