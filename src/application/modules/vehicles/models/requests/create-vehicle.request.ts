import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNumber } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateVehicleRequest {
  @ApiProperty()
  @AutoMap()
  @IsString()
  public vehicleNumber: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsOptional()
  @IsString()
  public vinNumber?: string;

  @ApiProperty()
  @AutoMap()
  @IsUUID()
  public companyId: string;

  @ApiProperty()
  @AutoMap()
  @IsUUID()
  public vehicleTypeId: string;

  @ApiProperty()
  @AutoMap()
  @IsUUID()
  public brandId: string;

  @ApiProperty()
  @AutoMap()
  @IsUUID()
  public fuelTypeId: string;
}
