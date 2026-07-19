import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { EVehicleStatus } from '../../../../shared/enums/e-vehicle-status';

export class UpdateVehicleRequest {
  @ApiPropertyOptional()
  @AutoMap()
  @IsOptional()
  @IsString()
  public vehicleNumber?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsOptional()
  @IsString()
  public vinNumber?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsOptional()
  @IsUUID()
  public vehicleTypeId?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsOptional()
  @IsEnum(EVehicleStatus)
  public status?: EVehicleStatus;
}
