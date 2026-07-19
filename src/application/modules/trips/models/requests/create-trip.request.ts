import { AutoMap } from '@automapper/classes';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTripRequest {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  public tripNumber: string;

  @AutoMap()
  @IsNotEmpty()
  @IsUUID()
  public vehicleId: string;

  @AutoMap()
  @IsNotEmpty()
  @IsUUID()
  public driverId: string;

  @AutoMap()
  @IsNotEmpty()
  @IsUUID()
  public customerId: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  public pickupLocation: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  public dropLocation: string;

  @AutoMap()
  @IsNotEmpty()
  @IsDate()
  public startDatetime: Date;

  @AutoMap()
  @IsOptional()
  @IsNumber()
  public estimatedDistance?: number;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  public priority: string;
}
